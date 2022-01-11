
import * as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {
	
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand("paste-as-multiline-string.pasteAsMultilineString", async editor =>
		{
			let text = await vscode.env.clipboard.readText();
			text = text.replace(/\t/g, "\\t");
			text = text.replace(/\"/g, "\\\"");

			let lines = text.split('\n');
			let newText = '';
			for (let i = 0; i < lines.length; i++) {
				let actuaLine = lines[i].substring(0, lines[i].length - 1);
				newText += '\"' + actuaLine + `${i !== lines[i].length ? "\\n\"" : "\""}`;

				if (i < lines.length - 1) {
					newText += ' +\n';
				}
			}

			editor.edit(builder => {
				builder.replace(editor.selection, newText);
			});
		}
        )
	);

}

export function deactivate() {}
