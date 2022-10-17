---

title: 'Installation of FeynArts, FormCalc, LoopTools'
date: '2020-01-05'
description: 'Tips on installation of Feyn***'
image: 'Mathematica_Logo.svg'

---

## Installation

[Here](http://www.feynarts.de) is a useful official information.
You can use the shell script `FeynInstall` to install all necessary public codes.
It is expected that you should just hit *yes* for all the questions, but it somehow failed in my case to set the suitable `$PATH` environment.
Thus, I manually set it by adding the following sentence in `~/Library/Mathemtica/Kernel/init.m`:

``` Mathematica
$Path = Join[{ToFileName[$HomeDirectory, "FeynArts"],
              ToFileName[$HomeDirectory, "FormCalc"]}, $Path]
```

Note that the above example corresponds to the case when `FeynInstall` is executed in the home directory.
