import fs from 'fs';
import matter from "gray-matter";

// TODO ここでHeader.jsに渡したいデータを生成してしまう
const createHeaderData = () => {
    // 普通に呼べる
    const file = fs.readFileSync(`tips/git.md`, 'utf-8');
    return 'header-data-test';
}

export default createHeaderData;
