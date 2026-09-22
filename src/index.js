#!/usr/bin/env node
import { chatBF } from './modules/chat.js';
import { debateBF } from './modules/debate.js';
import { statusBF } from './modules/base.js';
import { backupBF } from './modules/backup.js';

const args = process.argv.slice(2);
const cmd = args[0];

switch(cmd){
 case 'chat':
   console.log(`💬 BF x8 Chat: "${args.slice(1).join(' ')}"`);
   await chatBF(args.slice(1).join(' '));
   break;
 case 'debate':
   await debateBF(args.slice(1).join(' '));
   break;
 case 'status':
   statusBF();
   break;
 case 'backup':
   await backupBF();
   break;
 default:
   console.log("Usa: bf chat | bf debate | bf status | bf backup");
}
