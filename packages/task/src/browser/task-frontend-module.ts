/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from 'inversify';
import { CommandContribution, MenuContribution, bindContributionProvider } from '@theia/core/lib/common';
import { TaskFrontendContribution } from './task-frontend-contribution';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging';
import { TaskServer, taskPath, TaskResolverRegistry, TaskContribution, TaskResolver } from '../common/task-protocol';
import { TaskWatcher } from '../common/task-watcher';
import { TaskService } from './task-service';
import { QuickOpenTask } from './quick-open-task';
import { TaskConfigurations } from './task-configurations';
import { createCommonBindings } from '../common/task-common-module';
import { TaskResolverRegistryImpl } from './process-resolver-registry';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { ProcessTaskResolver } from './process-task-resolver';
import { CheTaskResolver } from './che/che-task-resolver';
import { CheTaskFrontendContribution } from './che/che-task-frontend-contribution';
import { NpmTaskResolver } from './npm/npm-task-resolver';
import { NpmTaskFrontendContribution } from './npm/npm-task-frontend-contribution';

export default new ContainerModule(bind => {
    bind(TaskFrontendContribution).toSelf().inSingletonScope();
    bind(TaskService).toSelf().inSingletonScope();

    for (const identifier of [FrontendApplicationContribution, CommandContribution, MenuContribution, TaskContribution]) {
        bind(identifier).toService(TaskFrontendContribution);
    }

    bind(TaskWatcher).toSelf().inSingletonScope();
    bind(QuickOpenTask).toSelf().inSingletonScope();
    bind(TaskConfigurations).toSelf().inSingletonScope();

    bind(TaskServer).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const taskWatcher = ctx.container.get(TaskWatcher);
        return connection.createProxy<TaskServer>(taskPath, taskWatcher.getTaskClient());
    }).inSingletonScope();

    createCommonBindings(bind);

    bind(TaskResolverRegistry).to(TaskResolverRegistryImpl).inSingletonScope();
    bindContributionProvider(bind, TaskContribution);

    // process task
    bind(ProcessTaskResolver).toSelf().inSingletonScope();
    bind(TaskResolver).to(ProcessTaskResolver).inSingletonScope();

    // Che task
    bind(CheTaskResolver).toSelf().inSingletonScope();
    bind(TaskResolver).to(CheTaskResolver).inSingletonScope();
    bind(TaskContribution).to(CheTaskFrontendContribution).inSingletonScope();

    // npm task
    bind(NpmTaskResolver).toSelf().inSingletonScope();
    bind(TaskResolver).to(NpmTaskResolver).inSingletonScope();
    bind(TaskContribution).to(NpmTaskFrontendContribution).inSingletonScope();
});
