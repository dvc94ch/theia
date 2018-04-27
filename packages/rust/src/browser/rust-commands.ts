/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify';
import { CommandContribution, CommandRegistry, Command,
         MenuContribution, MenuModelRegistry } from '@theia/core';
import { KeybindingContribution,
         KeybindingRegistry } from '@theia/core/lib/browser';
import { Message, MessageType } from '@theia/core/lib/common';
import { EditorManager, EditorCommands,
         EDITOR_CONTEXT_MENU } from '@theia/editor/lib/browser';
import { NotificationsMessageClient
       } from '@theia/messages/lib/browser/notifications-message-client';
import { WorkspaceEdit, Workspace } from '@theia/languages/lib/common';
import { RustClientContribution } from './rust-client-contribution';
import { RustKeybindingContexts } from './rust-keybinding-contexts';

export const SHOW_RUST_REFERENCES: Command = {
    id: 'rust.show.references'
};

export const APPLY_WORKSPACE_EDIT: Command = {
    id: 'rust.apply.workspaceEdit'
};

export const RLS_FIND_IMPLS: Command = {
    label: 'Rust: Find impls',
    id: 'rust.rls.findImpls'
};

export const RLS_RESTART: Command = {
    label: 'Rust: rls restart',
    id: 'rust.rls.restart'
};

export const CARGO_CHECK: Command = {
    label: 'Rust: Check crate',
    id: 'rust.cargo.check'
};

export const CARGO_BUILD: Command = {
    label: 'Rust: Build crate',
    id: 'rust.cargo.build'
};

export const CARGO_RUN: Command = {
    label: 'Rust: Run crate',
    id: 'rust.cargo.run'
};

export const CARGO_TEST: Command = {
    label: 'Rust: Test crate',
    id: 'rust.cargo.test'
};

export const CARGO_BENCH: Command = {
    label: 'Rust: Bench crate',
    id: 'rust.cargo.bench'
};

@injectable()
export class RustCommands implements CommandContribution, MenuContribution, KeybindingContribution {

    @inject(Workspace)
    protected readonly workspace: Workspace;

    @inject(EditorManager)
    protected readonly editorManager: EditorManager;

    @inject(NotificationsMessageClient)
    protected readonly messageClient: NotificationsMessageClient;

    @inject(RustClientContribution)
    protected readonly rustClientContribution: RustClientContribution;

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(SHOW_RUST_REFERENCES, {
            execute: (uri: string, position: Position, locations: Location[]) =>
                commands.executeCommand(EditorCommands.SHOW_REFERENCES.id,
                                        uri, position, locations)
        });
        commands.registerCommand(APPLY_WORKSPACE_EDIT, {
            execute: (changes: WorkspaceEdit) =>
                !!this.workspace.applyEdit && this.workspace.applyEdit(changes)
        });
        commands.registerCommand(RLS_FIND_IMPLS, {
            execute: (uri: string, position: Position, locations: Location[]) => {

            }
        });
        commands.registerCommand(RLS_RESTART, {
            execute: () => {
                this.messageClient.showMessage(<Message> {
                    text: 'Restarting rls',
                    type: MessageType.Log
                });
            }
        });
        commands.registerCommand(CARGO_CHECK, {
            execute: () => {
                this.messageClient.showMessage(<Message> {
                    text: 'Running cargo check',
                    type: MessageType.Log
                });
            }
        });
        commands.registerCommand(CARGO_BUILD, {
            execute: () => {
                this.messageClient.showMessage(<Message> {
                    text: 'Running cargo build',
                    type: MessageType.Log
                });
            }
        });
        commands.registerCommand(CARGO_RUN, {
            execute: () => {
                this.messageClient.showMessage(<Message> {
                    text: 'Running cargo run',
                    type: MessageType.Log
                });
            }
        });
        commands.registerCommand(CARGO_TEST, {
            execute: () => {
                this.messageClient.showMessage(<Message> {
                    text: 'Running cargo test',
                    type: MessageType.Log
                });
            }
        });
        commands.registerCommand(CARGO_BENCH, {
            execute: () => {
                this.messageClient.showMessage(<Message> {
                    text: 'Running cargo bench',
                    type: MessageType.Log
                });
            }
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_rust"), {
            commandId: RLS_FIND_IMPLS.id,
            label: RLS_FIND_IMPLS.label
        });
    }

    registerKeybindings(keybindings: KeybindingRegistry): void {
        keybindings.registerKeybinding({
            command: CARGO_CHECK.id,
            context: RustKeybindingContexts.rustEditorTextFocus,
            keybinding: 'space m c'
        });
        keybindings.registerKeybinding({
            command: CARGO_BUILD.id,
            context: RustKeybindingContexts.rustEditorTextFocus,
            keybinding: 'space m b'
        });
        keybindings.registerKeybinding({
            command: CARGO_RUN.id,
            context: RustKeybindingContexts.rustEditorTextFocus,
            keybinding: 'space m r'
        });
        keybindings.registerKeybinding({
            command: CARGO_TEST.id,
            context: RustKeybindingContexts.rustEditorTextFocus,
            keybinding: 'space m t'
        });
        keybindings.registerKeybinding({
            command: CARGO_CHECK.id,
            context: RustKeybindingContexts.rustEditorTextFocus,
            keybinding: 'space m p'
        });
        keybindings.registerKeybinding({
            command: RLS_RESTART.id,
            context: RustKeybindingContexts.rustEditorTextFocus,
            keybinding: 'space m s'
        });
    }
}
