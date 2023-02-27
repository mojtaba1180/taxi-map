# Taxi-Peyk

>**_NOTE:_**  use yarn to start project

# env example
1: create .env
<br/>
2: added to root project
<br/>
3: use bottom env 
```
VITE_APP_NAME="peyk"
VITE_NOMINATIM_URL= "https://map.azadiweb.ir/nominatim"
VITE_OSRM_URL= "https://osrm.azadiweb.ir"
VITE_MAP_STYLE= "https://tiles.raah.ir/dynamic/new_style_preview.json"
VITE_API_URL= "https://bolvar.api.netserv.ir"
VITE_BASE_URL="/ui"
VITE_DEFAULT_CENTER="32.65906869980235,51.66687495218116"

```

# Yarn Start Project 
 

install dep
```
yarn
```
start
```
yarn dev
```
build
```
yarn build
```
preview or serve
```
yarn preview
```


<!-- 
# Npm Start Project 
 

install dep
```
npm i
```
start
```
npm run  dev
```
build
```
npm run  build
```
preview or serve
```
npm run preview
``` -->

# Getting started

## Map Query

### route: **/map**

| name     | detail      | default and example  
| ------------- | ------------- | --------  |
| `showDirection`| show direction button      | `false`   |
| `showSearchBar`| show search bar       | `true`   |
| `collapsed`| collapse search bar       | `false`   |
| `loc`          | add locations for direction | `loc=32.662737%2C51.665096%3B32.66188%2C51.665723%3B32.66548365103051,51.666493402459196`   |
| `z`| zoom      | `14`   |
| `type`| type direction      | default(`car`) - `bike` - `foot`   |
| `center`| set map center      | `center=32.66548365103051,51.666493402459196`   |
| `marker`| add marker on map       | `marker=32.662737%2C51.665096`   |
| `marker_name`| set custom name on marker       | `marker_name=example`   |
| `marker_locked`| lock all markers      | `false`   |
| `collapsed`| collapsed search bar       | `false`   |

<br><br><br>

### route: **/map/order**

| name     | detail      | default and example  
| ------------- | ------------- | --------  |
| `start`| set start time **(required)**    | `2023-01-31 08:00:00`   |
| `end`  | set end time **(required)**      | `2023-01-31 23:00:00`   |
| `top`  | number of location               | `500`   |
| `order_app_id`| filter by peyk id type: `number`        | `10001`   |
| `center`| set map center      | `center=32.66548365103051,51.666493402459196`   |
| `z`     |  zoom               | `14`                                |
| `auth_key`     |  token               |  `String`                                |
<br><br><br><br><br>


### route: **/map/live**

| name     | detail      | default and example  
| ------------- | ------------- | --------  |
| `minute`  | setTime location **(required)**      | `5`   |
| `top`  | number of location   **(required)**            | `12`   |
| `center`| set map center      | `center=32.66548365103051,51.666493402459196`   |
| `z`     |  zoom               | `14`  
| `auth_key`     |  token               |  `String`                               |
<br><br><br><br><br>

# Docker 

pending ...