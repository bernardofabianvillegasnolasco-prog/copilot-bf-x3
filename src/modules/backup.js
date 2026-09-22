import { execSync } from "child_process";
export function runBackup() {
  console.log("🤖 COPILOT BF x3 - Backup IA");
  execSync("~/IA/ia_backup.sh", { stdio: "inherit" });
}
