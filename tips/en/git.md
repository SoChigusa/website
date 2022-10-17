---

title: 'Git for everyone'
date: '2022-08-14'
description: 'Tips on the basic/advanced use of git'
image: 'Git-logo.svg'

---

Logo by <a href="https://git-scm.com/" target="_blank">Git</a>

## Use latexdiff

There is a *git* compatible version of *latexdiff* named `latexdiff-vc`.
This compares the same *latex* documents in two different commits within a git repository.
See here for more detailed desription and a usage example.

## Use merge

I often personally use `git merge` to merge a draft that is written for a collaborative project that do not use `git` for version control.

First of all, I `push` all the modifications of the local files

```shell
git push origin master
```

Next, I make the master version back to the one corresponding to the period from which many people starts editing it.

```shell
git reset --hard (commit)
```

I make new branch on which I update the others modification to the draft

```shell
git branch (branch name)
git checkout (branch name)
cp (new draft) (old draft)
```

Finally, I make the master version to the newest to merge the modifications made by myself and others.

```shell
git checkout master
git pull origin master
git merge (branch name)
```

## Remove the commit history file by file

### Why did I need it?

At some point, I finished using [bitbucket](https://bitbucket.org/) and transferred my repositories to [github](https://github.com/).
One repository had a commit history that included a file larger than 100MB, which had been deleted in the newest commit.
It did not cause any problem when I was using bitbucket, but did caused with github due to the size limitation.
So, I needed to consistently remove all the commit information related to this large file.

### What I did

I could find which file in the history had a large size using [git_find_big.sh](https://confluence.atlassian.com/bitbucket/files/321848291/321979854/1/1360604134990/git_find_big.sh) provided by Atlassian.
I executed in the root of the repository

``` shell
./git_find_big.sh
```

After identifying which file to be deleted, I executed

``` shell
#!/bin/bash

TARGETS=(
  "[target file name]"
)
target=$(printf " %s" "${TARGETS[@]}")
target=${target:1}
git filter-branch --index-filter "git rm -r --cached --ignore-unmatch ${target}" -- --all
```

IMPORTANT: please be aware that you take a back up of the repository before executing this, of course!
