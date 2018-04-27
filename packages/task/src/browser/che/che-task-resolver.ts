/*
 * Copyright (C) 2018 Red Hat, Inc. and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from 'inversify';
import { VariableResolverService } from '@theia/variable-resolver/lib/browser';
import { TaskResolver } from '../../common/task-protocol';
import { CheTaskConfiguration } from '../../common/che/task-protocol';

@injectable()
export class CheTaskResolver implements TaskResolver {

    @inject(VariableResolverService)
    protected readonly variableResolverService: VariableResolverService;

    async resolveTask(task: CheTaskConfiguration): Promise<CheTaskConfiguration> {
        const resultTask: CheTaskConfiguration = {
            type: task.type,
            label: task.label,
            target: task.target,
            command: await this.variableResolverService.resolve(task.command)
        };
        resultTask.cwd = await this.variableResolverService.resolve(task.cwd ? task.cwd : '${workspaceFolder}');
        return resultTask;
    }
}
