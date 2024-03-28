import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SliderV1WebPartStrings';
import SliderV1 from './components/SliderV1';
import { ISliderV1Props } from './components/ISliderV1Props';


import { getSP} from '../sp/pnpjsConfig';

export interface ISliderV1WebPartProps {
  description: string;
}

export default class SliderV1WebPart extends BaseClientSideWebPart<ISliderV1WebPartProps> {


  public render(): void {
    const element: React.ReactElement<ISliderV1Props> = React.createElement(
      SliderV1,
      {
        description: this.properties.description,
        context:this.context
      }
    );

    getSP(this.context);
    
    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
