#!/data/data/com.termux/files/usr/bin/bash
if [ "$1" = "chat" ]; then shift; node --input-type=module -e "import {chatBF} from './src/modules/chat.js'; chatBF(process.argv.slice(1).join(' ')).then(r=>console.log(r))" "$@"
elif [ "$1" = "backup" ]; then mkdir -p /sdcard/IA-backup; cp -r src system_prompt.txt .env bf 2>/dev/null /sdcard/IA-backup/; cp -r src/* /sdcard/IA-backup/src/ 2>/dev/null; echo "Backup en /sdcard/IA-backup - BFVillegas(Berna)"
else echo "bf chat | bf backup"; fi
