/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from 'inversify';
import { KeybindingContribution } from '@theia/core/lib/browser';
import { SpacemacsKeybindings } from './spacemacs-keybindings';

export default new ContainerModule(bind => {
    bind(SpacemacsKeybindings).toSelf().inSingletonScope();
    bind(KeybindingContribution).toDynamicValue(ctx =>
        ctx.container.get(SpacemacsKeybindings)).inSingletonScope();
});
