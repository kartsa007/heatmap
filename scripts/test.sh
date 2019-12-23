#!/usr/bin/sh

value=0
for i  in $(seq 0 11); do
  for j in $(seq 0 30); do
    echo ${i},${j},$value
    value=$(((value+1)%11))
    echo ${i},${j},$value |  cat >> heatmap.csv
    sleep 1s
  done
done
