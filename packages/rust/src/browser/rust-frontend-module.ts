/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from 'inversify';
import { CommandContribution, MenuContribution } from '@theia/core';
import { KeybindingContribution, KeybindingContext } from '@theia/core/lib/browser';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { RustClientContribution } from "./rust-client-contribution";
import { RustCommands } from './rust-commands';
import { RustEditorTextFocusContext } from './rust-keybinding-contexts';

import "./monaco-contribution";

export default new ContainerModule(bind => {
    bind(RustClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toDynamicValue(ctx =>
        ctx.container.get(RustClientContribution)).inSingletonScope();

    bind(RustCommands).toSelf().inSingletonScope();
    bind(CommandContribution).toDynamicValue(ctx =>
        ctx.container.get(RustCommands)).inSingletonScope();

    bind(MenuContribution).toDynamicValue(ctx =>
        ctx.container.get(RustCommands)).inSingletonScope();
    bind(KeybindingContribution).toDynamicValue(ctx =>
        ctx.container.get(RustCommands)).inSingletonScope();

    bind(KeybindingContext).to(RustEditorTextFocusContext).inSingletonScope();
});
