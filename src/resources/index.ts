import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName("../modules/EspalierJS/src/grid/espalier"),
    PLATFORM.moduleName("../modules/EspalierJS/src/form-controls/espalier-checkbox"),
    PLATFORM.moduleName("../modules/EspalierJS/src/form-controls/espalier-date"),
    PLATFORM.moduleName("../modules/EspalierJS/src/form-controls/espalier-input")
  ]);
}
