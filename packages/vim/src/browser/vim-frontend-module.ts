/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from 'inversify';
import { CommandContribution } from '@theia/core';
import { KeybindingContribution, KeybindingContext,
         FrontendApplicationContribution } from '@theia/core/lib/browser';
import { VimCommands } from './vim-commands';
import { VimVisualModeContext,
         VimInsertModeContext } from './vim-keybinding-contexts';
import { VimKeybindings } from './vim-keybindings';
import { VimStatusBarContribution } from './vim-status-bar-contribution';
import { EditorTextFocusContext } from '@theia/editor/lib/browser';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(VimCommands).toSelf().inSingletonScope();
    bind(CommandContribution).toDynamicValue(ctx =>
        ctx.container.get(VimCommands)).inSingletonScope();

    bind(KeybindingContext).to(VimVisualModeContext).inSingletonScope();
    bind(KeybindingContext).to(VimInsertModeContext).inSingletonScope();
    rebind(EditorTextFocusContext).to(VimInsertModeContext).inSingletonScope();

    bind(VimKeybindings).toSelf().inSingletonScope();
    bind(KeybindingContribution).toDynamicValue(ctx =>
        ctx.container.get(VimKeybindings)).inSingletonScope();

    bind(VimStatusBarContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toDynamicValue(ctx =>
        ctx.container.get(VimStatusBarContribution)).inSingletonScope();
});
