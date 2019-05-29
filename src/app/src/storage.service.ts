
import { Component } from './models/Network/Component';

export interface KomponentLoadedHandler {
    (component:Component): void;
}

export class StorageService {

    private _komponentLoadedHandler:KomponentLoadedHandler;

    constructor(komponentLoadedHandler: KomponentLoadedHandler)
    {
        this._komponentLoadedHandler = komponentLoadedHandler;
    }

    public LoadFile(file: File) {
        debugger;
        const reader = new FileReader();
        reader.onload = this.OnFileLoaded;
        reader.readAsText(file);
    }

    private OnFileLoaded(progressResult: ProgressEvent) {
        debugger;
        if (progressResult && progressResult.target) {
            this.BuildComponent(progressResult.target.result);
        }
    }

    private BuildComponent(fileContent: string)
    {
        let loadedCompoent: Component = JSON.parse(fileContent);       
        this._komponentLoadedHandler(loadedCompoent);      
    }
}