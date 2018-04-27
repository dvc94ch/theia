/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from 'inversify';
import { KeybindingContribution, KeybindingRegistry } from '@theia/core/lib/browser';
import { ENTER_INSERT_MODE, EXIT_INSERT_MODE } from './vim-commands';
import { VimKeybindingContexts } from './vim-keybinding-contexts';

@injectable()
export class VimKeybindings implements KeybindingContribution {

    registerKeybindings(keybindings: KeybindingRegistry): void {
        keybindings.registerKeybinding({
            command: ENTER_INSERT_MODE.id,
            context: VimKeybindingContexts.vimVisualMode,
            keybinding: 'i'
        });
        keybindings.registerKeybinding({
            command: EXIT_INSERT_MODE.id,
            context: VimKeybindingContexts.vimInsertMode,
            keybinding: 'escape'
        });
    }
}
