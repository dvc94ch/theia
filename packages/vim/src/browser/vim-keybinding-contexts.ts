/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify';
// import { KeybindingContext } from '@theia/core/lib/browser';
import { EditorTextFocusContext } from "@theia/editor/lib/browser";
import { VimCommands } from './vim-commands';

export namespace VimKeybindingContexts {
    export const vimVisualMode = 'vimVisualMode';
    export const vimInsertMode = 'vimInsertMode';
}

@injectable()
export class VimVisualModeContext extends EditorTextFocusContext {

    readonly id: string = VimKeybindingContexts.vimVisualMode;

    @inject(VimCommands)
    protected readonly vimCommands: VimCommands;

    isEnabled(): boolean {
        return !this.vimCommands.inInsertMode() && !!this.getEditor();
    }

}

@injectable()
export class VimInsertModeContext extends EditorTextFocusContext {

    readonly id: string = VimKeybindingContexts.vimInsertMode;

    @inject(VimCommands)
    protected readonly vimCommands: VimCommands;

    isEnabled(): boolean {
        return this.vimCommands.inInsertMode() && !!this.getEditor();
    }

}
