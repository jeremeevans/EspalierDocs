import { autoinject } from "aurelia-framework";
import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { EspalierInput } from "modules/EspalierJS/src";
import { HttpClient } from "aurelia-http-client";

interface FindAddress {
  address: string,
  city: string,
  state: StateAndAbbr,
  zip: string,
  name: string,
  phone: string,
  aDate: string
}

interface SmartySuggestion {
  text: string,
  street_line: string,
  city: string,
  state: string
}

interface StateAndAbbr {
  name: string,
  abbr: string
}

const allStates: StateAndAbbr[] = [
  { name: "Alabama", abbr: "AL" },
  { name: "Alaska", abbr: "AK" },
  { name: "Arizona", abbr: "AZ" },
  { name: "Arkansas", abbr: "AR" },
  { name: "California", abbr: "CA" },
  { name: "Colorado", abbr: "CO" },
  { name: "Connecticut", abbr: "CT" },
  { name: "Delaware", abbr: "DE" },
  { name: "Florida", abbr: "FL" },
  { name: "Georgia", abbr: "GA" },
  { name: "Hawaii", abbr: "HI" },
  { name: "Idaho", abbr: "ID" },
  { name: "Illinois", abbr: "IL" },
  { name: "Indiana", abbr: "IN" },
  { name: "Iowa", abbr: "IA" },
  { name: "Kansas", abbr: "KS" },
  { name: "Kentucky", abbr: "KY" },
  { name: "Louisiana", abbr: "LA" },
  { name: "Maine", abbr: "ME" },
  { name: "Maryland", abbr: "MD" },
  { name: "Massachusetts", abbr: "MA" },
  { name: "Michigan", abbr: "MI" },
  { name: "Minnesota", abbr: "MN" },
  { name: "Mississippi", abbr: "MS" },
  { name: "Missouri", abbr: "MO" },
  { name: "Montana", abbr: "MT" },
  { name: "Nebraska", abbr: "NE" },
  { name: "Nevada", abbr: "NV" },
  { name: "New Hampshire", abbr: "NH" },
  { name: "New Jersey", abbr: "NJ" },
  { name: "New Mexico", abbr: "NM" },
  { name: "New York", abbr: "NY" },
  { name: "North Carolina", abbr: "NC" },
  { name: "North Dakota", abbr: "ND" },
  { name: "Ohio", abbr: "OH" },
  { name: "Oklahoma", abbr: "OK" },
  { name: "Oregon", abbr: "OR" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "Rhode Island", abbr: "RI" },
  { name: "South Carolina", abbr: "SC" },
  { name: "South Dakota", abbr: "SD" },
  { name: "Tennessee", abbr: "TN" },
  { name: "Texas", abbr: "TX" },
  { name: "Utah", abbr: "UT" },
  { name: "Vermont", abbr: "VT" },
  { name: "Virginia", abbr: "VA" },
  { name: "Washington", abbr: "WA" },
  { name: "West Virginia", abbr: "WV" },
  { name: "Wisconsin", abbr: "WI" },
  { name: "Wyoming", abbr: "WY" }
];

@autoinject()
export class ControlsDemo {
  protected validationController: ValidationController
  protected addressControl: EspalierInput;
  protected allStates: [string, any][] = [];
  protected model: FindAddress;

  constructor(validationFactory: ValidationControllerFactory) {
    for (const s of allStates.sort((a, b) => a.abbr > b.abbr ? 1 : -1)) {
      this.allStates.push([s.abbr, s]);
    }

    const now = new Date();
    this.model = {
      address: "", city: "Tacoma", state: this.allStates[0][1],
      zip: "", name: "", phone: "", aDate: now.toUTCString()
    };

    ValidationRules.ensure((fa: FindAddress) => fa.address)
      .required()
      .ensure((fa: FindAddress) => fa.city)
      .required()
      .ensure((fa: FindAddress) => fa.zip)
      .required()
      .ensure((fa: FindAddress) => fa.name)
      .required()
      .ensure((fa: FindAddress) => fa.phone)
      .required()
      .ensure((fa: FindAddress) => fa.aDate)
      .required()
      .on(this.model);
    this.validationController = validationFactory.createForCurrentScope();
  }

  protected attached() {
    this.addressControl.focus();
  }

  protected async lookupAddress(street: string): Promise<[string, any][]> {
    const client = new HttpClient();
    const response = await client.get(`https://us-autocomplete.api.smartystreets.com/suggest?prefix=${street}&auth-id=8640932995837522`);
    return response.content.suggestions.map((suggestion: SmartySuggestion) => [suggestion.text, suggestion]);
  }

  protected selectAddress = (address: SmartySuggestion) => {
    this.model.address = address.street_line;
    this.model.city = address.city;

    const foundState = this.allStates.find((s) => s[0] == address.state);
    this.model.state = foundState[1];
    // this.model.zip = address.
  }

  protected seeSomeThings() {
    alert("We are here...");
  }
}
