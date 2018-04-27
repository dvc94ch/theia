/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from 'inversify';
import { CommandContribution, CommandRegistry, Command } from '@theia/core';

export const ENTER_INSERT_MODE: Command = {
    id: 'vim.enterInsertMode'
};

export const EXIT_INSERT_MODE: Command = {
    id: 'vim.exitInsertMode'
};

@injectable()
export class VimCommands implements CommandContribution {
    protected insertMode: boolean = false;
    protected vimModeChangedHandlers: (() => void)[] = [];

    onVimModeChanged(cb: () => void): void {
        this.vimModeChangedHandlers.push(cb);
    }

    inInsertMode(): boolean {
        return this.insertMode;
    }

    protected setVimMode(insertMode: boolean): void {
        this.insertMode = insertMode;
        for (const handler of this.vimModeChangedHandlers) {
            handler();
        }
    }

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(ENTER_INSERT_MODE, {
            execute: () => this.setVimMode(true)
        });
        commands.registerCommand(EXIT_INSERT_MODE, {
            execute: () => this.setVimMode(false)
        });
    }
}
