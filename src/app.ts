import { Aurelia, autoinject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { PLATFORM } from 'aurelia-pal';
import { EspalierGrid, ColumnType, SortOrder } from 'modules/EspalierJS/src';
import { StaticDataSouce } from 'modules/EspalierJS/src/grid/data-sources/static-data-source';
import { HttpClient } from 'aurelia-http-client';
import { HttpClientSource } from 'modules/EspalierJS/src/grid/data-sources/http-client-source';
import { Router, RouterConfiguration, RouteConfig } from "aurelia-router";

@autoinject()
export class App {
  protected staticGrid: EspalierGrid<any>;
  protected dynamicGrid: EspalierGrid<any>;
  protected validationController: ValidationController;
  protected rootRouter: Router;
  private data: any[];

  constructor(private http: HttpClient) { }

  protected configureRouter(config: RouterConfiguration, router: Router) {
    this.rootRouter = router;
    const routes: Array<RouteConfig> = [{
      route: "",
      name: "ControlsDemo",
      moduleId: PLATFORM.moduleName("./controls-demo"),
      title: "Espalier Controls Demo"
    }];
    config.map(routes);
    config.fallbackRoute("");
  }

  protected async activate() {
    this.data = (await this.http.get("/MOCK_DATA.json")).content;
  }

  protected attached() {
    this.staticGrid.settings = {
      dataSource: new StaticDataSouce(this.data),
      columns: [
        { propertyName: "first_name", title: "First Name" },
        { propertyName: "birthday", type: ColumnType.Date }
      ]
    };
    this.dynamicGrid.settings = {
      dataSource: new HttpClientSource("https://espalierjsdemoapi.herokuapp.com/DemoData", this.http),
      columns: [
        { propertyName: "companyName", title: "Company Name" },
        { propertyName: "paymentDate", title: "Payment Date", type: ColumnType.DateTime, sortOrder: SortOrder.Descending },
        { propertyName: "paymentAmount", title: "Amount", type: ColumnType.Currency }
      ]
    };
  }
}
