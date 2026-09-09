# Configuration API

Read and change the bridge's configuration without editing files on the device.

```
GET  /api/config                   everything
GET  /api/config/{section}         one section
GET  /api/config/module/{section}  a module's settings
POST /api/config/module            update a module
POST /api/config/radio             radio settings
POST /api/config/owner             owner identity
GET  /api/config/export            full config as a file
POST /api/config/import            apply a config file
POST /api/config/diff              preview what an import would change
```

## diff before import

`import` replaces configuration. `diff` takes the same payload and reports what would change
without changing it.

Run the diff first, every time. An import that turns out to have been generated from a different
bridge, or from an older version, can take a working device off the air, and on hardware in the
field that is not a quick fix.

## export is a backup and a template

`export` gives you the whole configuration as a file. It is the right way to stand up a second
bridge configured like the first, and the right thing to keep before making a change you are not
sure about.

## Owner and radio

`owner` sets the identity the device presents on the mesh; `radio` sets the radio parameters.
Changing radio settings can make the device invisible to its own mesh if the new values do not
match the rest of the network, so change them one at a time.

## Field reference

See the generated OpenAPI specification at [Bridge API](/api/).
