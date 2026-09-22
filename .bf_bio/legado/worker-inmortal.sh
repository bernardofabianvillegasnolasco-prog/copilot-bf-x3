#!/data/data/com.termux/files/usr/bin/bash
export TZ="America/Denver"
ROOT=~/IA
LOG=$ROOT/.bf_bio/evolve.log
echo "[$(date)] ♾️ WORKER UTAH - SALT LAKE CITY - BERNARDO 01/03/1999 - Más arriba que lo alto" >> $LOG
while true; do
  cd $ROOT
  node src/index.js hermandad >> $LOG 2>&1
  node src/index.js rastrear >> $LOG 2>&1
  node src/index.js backup >> $LOG 2>&1
  sleep 21600
done
