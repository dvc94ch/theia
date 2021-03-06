/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from 'inversify';
import { KeybindingContribution, KeybindingRegistry,
         CommonCommands } from '@theia/core/lib/browser';
import { VimKeybindingContexts } from '@theia/vim/lib/browser';

@injectable()
export class SpacemacsKeybindings implements KeybindingContribution {

    registerKeybindings(keybindings: KeybindingRegistry): void {
        keybindings.registerKeybinding({
            command: CommonCommands.SAVE.id,
            context: VimKeybindingContexts.vimVisualMode,
            keybinding: 'space f s'
        });
    }
}
