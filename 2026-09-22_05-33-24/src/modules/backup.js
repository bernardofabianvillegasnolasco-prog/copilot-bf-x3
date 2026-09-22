import { execSync } from "child_process";
import fs from "fs";
export function runBackup(clean = false) {
  console.log("🤖 COPILOT BF x3 - Backup IA");
  execSync("bash ~/IA/ia_backup.sh", { stdio: "inherit" });
  if (clean) {
    const root = "/sdcard/IA-backup";
    const dirs = fs.readdirSync(root).filter(d => { try { return fs.statSync(`${root}/${d}`).isDirectory(); } catch { return false; } }).sort();
    if (dirs.length > 5) {
      const toDelete = dirs.slice(0, dirs.length - 5);
      console.log(`\n🧹 Limpiando ${toDelete.length} backups viejos...`);
      toDelete.forEach(d => execSync(`rm -rf "${root}/${d}"`));
      console.log("✅ Clean completado, se conservan 5 últimos");
    }
  }
}
