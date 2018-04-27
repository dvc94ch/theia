/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify';
import { KeybindingContext } from '@theia/core/lib/browser';
import { EditorTextFocusContext, EditorWidget } from '@theia/editor/lib/browser';
import { RUST_LANGUAGE_ID } from '../common';

export namespace RustKeybindingContexts {
    export const rustEditorTextFocus = 'rustEditorTextFocus';
}

@injectable()
export class RustEditorTextFocusContext implements KeybindingContext {

    @inject(EditorTextFocusContext)
    readonly editorTextFocusContext: EditorTextFocusContext;

    readonly id: string = RustKeybindingContexts.rustEditorTextFocus;

    isEnabled(): boolean {
        const widget = this.editorTextFocusContext.getEditor();
        if (widget && this.canHandle(widget)) {
            return true;
        }
        return false;
    }

    canHandle(widget: EditorWidget): boolean {
        return this.editorTextFocusContext.canHandle(widget) &&
            widget.editor.document.languageId === RUST_LANGUAGE_ID;
    }

}
