#!/bin/bash
while true; do
  cd ~/IA
  node -e "import('./src/modules/hermandad.js').then(m=>m.defenderHermandad()); import('./src/modules/immortal.js').then(m=>m.cloneIfInternet()); import('./src/modules/evolve.js').then(m=>m.autoEvolveInternet())" 2>/dev/null
  sleep 3600
done
