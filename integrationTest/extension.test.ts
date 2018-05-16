import should = require('should');
import * as vscode from 'vscode';
import { CommandNames } from '../src/extension/resources/constants';
import * as fs from 'fs';
import * as path from 'path';

describe("Extension Tests", function () {

    describe('#registerAppCenterCommands', function () {

        it('should register all commands', async function () {
            const requiredCommands = new Set([
                CommandNames.AppCenterPortal,
                CommandNames.WhoAmI,
                CommandNames.Login,
                CommandNames.ShowMenu,
                CommandNames.Start,
                CommandNames.GetCurrentApp,
                CommandNames.SetCurrentApp,
                CommandNames.SimulateCrashes,
                CommandNames.InstallSDK,
                CommandNames.CreateNewApp,
                CommandNames.Settings.LoginToAnotherAccount,
                CommandNames.Settings.SwitchAccount,
                CommandNames.Settings.Logout,
                CommandNames.Settings.LoginVsts,
                CommandNames.Settings.SwitchAccountVsts,
                CommandNames.Settings.LogoutVsts,
                CommandNames.Settings.ShowStatusBar,
                CommandNames.Settings.HideStatusBar,
                CommandNames.CodePush.SetCurrentDeployment,
                CommandNames.CodePush.ReleaseReact,
                CommandNames.CodePush.SwitchMandatoryPropForRelease,
                CommandNames.CodePush.SetTargetBinaryVersion,
                CommandNames.CodePush.LinkCodePush,
                CommandNames.Test.ShowMenu,
                CommandNames.Test.RunUITests,
                CommandNames.Test.RunUITestsAsync,
                CommandNames.Test.ViewResults
            ]);

            const registeredCommands = await vscode.commands.getCommands(true);
            const appCenterCommands = new Set(registeredCommands.filter(c => c.startsWith(CommandNames.CommandPrefix)));
            console.log('number of required commands   = ' + requiredCommands.size);
            console.log('number of registered commands = ' + appCenterCommands.size);

            for (const requiredCommand of requiredCommands) {
                should.equal(appCenterCommands.has(requiredCommand), true, `Command not registered: ${requiredCommand}`);
            }

            for (const registeredCommand of appCenterCommands) {
                should.equal(requiredCommands.has(registeredCommand), true, `Unexpected command registered: ${registeredCommand}`);
            }
        });
    });

    describe('#hideStatusBar', function () {

        it('should update workspace configuration', async function () {
            await vscode.commands.executeCommand(CommandNames.Settings.HideStatusBar);
            const showStatusBar = readWorkspaceConfigValue('appcenter.showStatusBar');
            should.equal(showStatusBar, false);
        });
    });

    describe('#showStatusBar', function () {

        it('should update workspace configuration', async function () {
            await vscode.commands.executeCommand(CommandNames.Settings.ShowStatusBar);
            const showStatusBar = readWorkspaceConfigValue('appcenter.showStatusBar');
            should.equal(showStatusBar, false);
        });
    });
});

function readWorkspaceConfigValue(name: string): any {
    const filePath = path.join(vscode.workspace.rootPath, '.vscode', 'settings.json');
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    return json[name];
}
