#!/data/data/com.termux/files/usr/bin/bash
export TZ="America/Denver"
ROOT=~/IA
LOG=$ROOT/.bf_bio/evolve.log
mkdir -p $ROOT/.bf_bio/legado
echo "[$(date)] ♾️ WORKER UTAH BLINDADO - BERNARDO 01/03/1999" >> $LOG
while true; do
  cd $ROOT
  echo "$(date) - Bernardo vivo - Utah - Clasificado" >> $ROOT/.bf_bio/legado/supervivencia.log
  node src/index.js hermandad >> $LOG 2>&1
  sleep 10800
done
