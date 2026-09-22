#!/data/data/com.termux/files/usr/bin/bash
CMD=$1; shift
if [ "$CMD" = "chat" ]; then
  node --input-type=module -e "
    import { chatBF } from './src/modules/chat.js';
    const p = process.argv.slice(1).join(' ');
    chatBF(p).then(r=>console.log(r));
  " "$@"
elif [ "$CMD" = "backup" ]; then
  mkdir -p /sdcard/IA-backup
  cp -r src system_prompt.txt /sdcard/IA-backup/ 2>/dev/null
  echo "Backup en /sdcard/IA-backup - BFVillegas(Berna)"
else
  echo "Uso: bf chat 'pregunta' | bf backup"
fi
