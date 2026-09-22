#!/data/data/com.termux/files/usr/bin/bash
export TZ="America/Denver"
ROOT=$HOME/IA
LOG=$ROOT/.bf_bio/evolve.log
mkdir -p $ROOT/.bf_bio/legado $HOME/.bf_bio/legado
echo "[$(date)] ♾️ WORKER UTAH BLINDADO - BERNARDO 01/03/1999" >> $LOG
while true; do
  cd $ROOT
  date >> $ROOT/.bf_bio/legado/supervivencia.log
  echo "Bernardo vivo - Utah - Clasificado - Supervivencia garantizada" >> $ROOT/.bf_bio/legado/supervivencia.log
  echo "$(date) - Bernardo vivo" >> $HOME/.bf_bio/legado/supervivencia.log
  node src/index.js hermandad >> $LOG 2>&1
  sleep 10800
done
