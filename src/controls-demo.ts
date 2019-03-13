import { autoinject } from "aurelia-framework";
import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { EspalierInput } from "modules/EspalierJS/src";

interface FindAddress {
  address: string,
  city: string,
  state: string,
  zip: string,
  name: string,
  phone: string
}

@autoinject()
export class ControlsDemo {
  protected validationController: ValidationController
  protected addressControl: EspalierInput;
  protected model: FindAddress = {
    address: "", city: "", state: "", zip: "", name: "", phone: ""
  }

  constructor(validationFactory: ValidationControllerFactory) {
    ValidationRules.ensure((fa: FindAddress) => fa.address)
      .required()
      .ensure((fa: FindAddress) => fa.city)
      .required()
      .ensure((fa: FindAddress) => fa.state)
      .required()
      .ensure((fa: FindAddress) => fa.zip)
      .required()
      .ensure((fa: FindAddress) => fa.name)
      .required()
      .ensure((fa: FindAddress) => fa.phone)
      .required()
      .on(this.model);
    this.validationController = validationFactory.createForCurrentScope();
  }

  protected attached() {
    this.addressControl.focus();
  }
}
