#!/bin/sh

for file_path in ../public/publicationImages/*.pdf
do
  fname=`basename ${file_path} .pdf`
  /opt/homebrew/bin/pdf2svg ${file_path} ../public/publicationImages/${fname}.svg
  rm ${file_path}
done