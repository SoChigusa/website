import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import styles from "../styles/MindDriftFeed.module.css";

const MIND_DRIFT_API_URL =
  "https://adhd-sage.vercel.app/api/public/so-chigusa-jqzvqs?limit=50";

type PublicWhisper = {
  id: string;
  text: string;
  createdAtMs: number;
  updatedAtMs: number;
};

type PublicWhispersResponse = {
  profile: {
    displayName: string;
    shareId: string;
  };
  whispers: PublicWhisper[];
};

const EMPTY_WHISPERS: PublicWhisper[] = [];

type FloatingWhisper = PublicWhisper & {
  instanceId: string;
  whisperId: string;
  left: number;
  top: number;
  driftX: number;
  driftY: number;
  durationMs: number;
  rotationStart: number;
  rotationEnd: number;
  hue: number;
};

function randomPointInEllipse(xRadius = 37, yRadius = 27) {
  let x = 0;
  let y = 0;

  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
  } while (x * x + y * y > 1);

  return {
    left: 50 + x * xRadius,
    top: 50 + y * yRadius,
  };
}

function buildFloatingWhisper(whisper: PublicWhisper): FloatingWhisper {
  const position = randomPointInEllipse();
  const driftTarget = randomPointInEllipse(15, 11);

  return {
    instanceId: `${whisper.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    whisperId: whisper.id,
    id: whisper.id,
    text: whisper.text,
    createdAtMs: whisper.createdAtMs,
    updatedAtMs: whisper.updatedAtMs,
    left: position.left,
    top: position.top,
    driftX: driftTarget.left - 50,
    driftY: driftTarget.top - 50,
    durationMs: 11200 + Math.round(Math.random() * 7200),
    rotationStart: -5 + Math.random() * 10,
    rotationEnd: -7 + Math.random() * 14,
    hue: Math.round(Math.random() * 32),
  };
}

function useFloatingWhispers(whispers: PublicWhisper[], maxVisible = 6) {
  const [activeWhispers, setActiveWhispers] = useState<FloatingWhisper[]>([]);
  const activeCountRef = useRef(0);

  useEffect(() => {
    activeCountRef.current = activeWhispers.length;
  }, [activeWhispers.length]);

  useEffect(() => {
    setActiveWhispers([]);
    activeCountRef.current = 0;
  }, [whispers]);

  useEffect(() => {
    if (!whispers.length) {
      return;
    }

    let active = true;
    let loopId = 0;
    const warmupIds: number[] = [];
    const spawnWhisper = () => {
      if (!whispers.length || activeCountRef.current >= maxVisible) {
        return;
      }

      const whisper = whispers[Math.floor(Math.random() * whispers.length)];
      const nextWhisper = buildFloatingWhisper(whisper);

      activeCountRef.current += 1;
      setActiveWhispers((current) => [...current, nextWhisper]);

      window.setTimeout(() => {
        activeCountRef.current = Math.max(0, activeCountRef.current - 1);
        setActiveWhispers((current) =>
          current.filter((item) => item.instanceId !== nextWhisper.instanceId),
        );
      }, nextWhisper.durationMs + 220);
    };

    const loop = () => {
      if (!active) {
        return;
      }

      spawnWhisper();
      loopId = window.setTimeout(loop, 900 + Math.random() * 1700);
    };

    for (let index = 0; index < Math.min(3, whispers.length); index += 1) {
      warmupIds.push(
        window.setTimeout(() => {
          spawnWhisper();
        }, index * 260),
      );
    }

    loop();

    return () => {
      active = false;
      window.clearTimeout(loopId);
      warmupIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [maxVisible, whispers]);

  return activeWhispers;
}

const MindDriftFeed = () => {
  const [data, setData] = useState<PublicWhispersResponse | null>(null);
  const [error, setError] = useState(false);
  const floatingWhispers = useFloatingWhispers(data?.whispers ?? EMPTY_WHISPERS);

  useEffect(() => {
    const controller = new AbortController();

    fetch(MIND_DRIFT_API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load Mind Drift.");
        }
        return response.json();
      })
      .then((nextData: PublicWhispersResponse) => setData(nextData))
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(true);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Box>
        {!data && !error ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1.5}
            sx={{ minHeight: 240 }}
          >
            <CircularProgress size={28} />
            <Typography color="text.secondary">つぶやきを読み込んでいます</Typography>
          </Stack>
        ) : null}

        {error ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ minHeight: 180, px: 2, textAlign: "center" }}
          >
            <Typography color="text.secondary">つぶやきを読み込めませんでした。</Typography>
          </Stack>
        ) : null}

        {data ? (
          <>
            <div className={styles.stageShell}>
              <div className={styles.stage}>
                <div className={`${styles.aura} ${styles.auraLeft}`} />
                <div className={`${styles.aura} ${styles.auraRight}`} />
                <div className={styles.brainCrop} aria-hidden="true">
                  <Image
                    alt=""
                    className={styles.brain}
                    draggable={false}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center top"
                    src="/repositoryImages/mind-drift-brain.svg"
                  />
                </div>
                <div className={styles.markers} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                {floatingWhispers.map((whisper) => (
                  <article
                    className={styles.bubble}
                    key={whisper.instanceId}
                    style={
                      {
                        left: `${whisper.left}%`,
                        top: `${whisper.top}%`,
                        "--drift-x": `${whisper.driftX}px`,
                        "--drift-y": `${whisper.driftY}px`,
                        "--duration": `${whisper.durationMs}ms`,
                        "--rotate-start": `${whisper.rotationStart}deg`,
                        "--rotate-end": `${whisper.rotationEnd}deg`,
                        "--bubble-hue": `${whisper.hue}deg`,
                      } as CSSProperties
                    }
                  >
                    <p>{whisper.text}</p>
                  </article>
                ))}

                {!data.whispers.length ? (
                  <p className={styles.empty}>まだ公開されたつぶやきはありません。</p>
                ) : null}
              </div>
            </div>

          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default MindDriftFeed;
