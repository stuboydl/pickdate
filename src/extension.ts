// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pickdate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pickdate.showdate', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// get pick date and time
		// SB 2022-08-03
		const msPerDay = 86400000;
		const pickEpoch = -63280800000; // Date('1967-12-31')[Symbol.toPrimitive]('number')
		let localTime = new Date();

		let pickMils = localTime[Symbol.toPrimitive]('number') - pickEpoch;
		let pickDate = Math.floor(pickMils / msPerDay);
		let pickTime = Math.floor((pickMils % msPerDay) / 1000);

      // let utcOffsetTime = new Date(localTime.setMinutes(localTime.getMinutes() - localTime.getTimezoneOffset()));
      // console.log(`It\'s time! ${utcOffsetTime.toISOString().substring(0, 19)}.\nPick date: ${pickDate}, time: ${pickTime}`);

		vscode.env.clipboard.writeText(`${pickDate} ${pickTime}`);
		vscode.window.showInformationMessage(`Pick date: ${pickDate}, time: ${pickTime} copied to clipboard`);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
