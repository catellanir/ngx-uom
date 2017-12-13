# ngx-uom
The ngx-uom library provide a service anda pipe that can be used to convert a given numeric value from an Unit Of Measure (uom) to
a another one (Ex from millimiters to inches)

## Installation

To install this library, run:

```bash
$ npm install ngx-uom --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngx-uom
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { UomModule } from 'ngx-uom';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify the UomModule as an import
    UomModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Pipe uom
uom pipe convert a given numeriv value from an unit of measure to another one

## Usage
{{value | uom : valueUom : desiredUom}}

## Example
```xml
<!-- You can now use the uom pipe in the template  -->
<!-- in this example the value temperature is to be given in celsius degrees and we want to display as 
<!-- kelvin degrees -->
<h1>
  {{title}}
</h1>
<div>{{temperature | uom : 'c' : 'k'}}</div>
```

## License

MIT © [Rossano Catellani](mailto:catellanir@yahoo.it)
