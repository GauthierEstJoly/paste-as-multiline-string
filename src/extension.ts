
import * as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {
	
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand("paste-as-multiline-string.pasteAsMultilineString", async editor =>
		{
			let text = await vscode.env.clipboard.readText();

			let deleteCR = vscode.workspace.getConfiguration('paste-as-multiline-string').get("deleteCarriageReturn");

			if (deleteCR === true) {
				text = text.replace(/\r/g, "");
			} else {
				text = text.replace(/\r/g, "\\r");
			}

			// Replace some special caracters
			text = text.replace(/\t/g, "\\t");
			text = text.replace(/\"/g, "\\\"");


			let lines = text.split('\n');
			let newText = '';

			for (let i = 0; i < lines.length; i++) {

				let actuaLine = lines[i];

				newText += '\"' + actuaLine;

				if (i < lines.length - 1) {
					newText += '\\n\" +\n';
				} else {
					newText += '\"';
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
