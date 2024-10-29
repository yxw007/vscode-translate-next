import { commands } from "vscode";
import { appName, outputChannel } from "../common";

export async function openOutputPanel() {
  outputChannel.show(true);
}

export const outputPanel = commands.registerCommand(`${appName}.openOutputPanel`, openOutputPanel);
