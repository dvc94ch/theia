/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify';
import { FrontendApplicationContribution, FrontendApplication,
         StatusBar, StatusBarAlignment } from '@theia/core/lib/browser';
import { VimCommands, ENTER_INSERT_MODE, EXIT_INSERT_MODE } from './vim-commands';

@injectable()
export class VimStatusBarContribution implements FrontendApplicationContribution {

    @inject(StatusBar)
    protected readonly statusBar: StatusBar;

    @inject(VimCommands)
    protected readonly vimCommands: VimCommands;

    onStart(app: FrontendApplication): void {
        this.updateStatusBar();
        this.vimCommands.onVimModeChanged(() => this.updateStatusBar());
    }

    protected updateStatusBar(): void {
        if (this.vimCommands.inInsertMode()) {
            this.statusBar.setElement('vim-mode', {
                text: 'insert',
                alignment: StatusBarAlignment.RIGHT,
                priority: 10,
                command: EXIT_INSERT_MODE.id
            });
        } else {
            this.statusBar.setElement('vim-mode', {
                text: 'visual',
                alignment: StatusBarAlignment.RIGHT,
                priority: 10,
                command: ENTER_INSERT_MODE.id
            });
        }
    }
}
