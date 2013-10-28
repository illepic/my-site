# Evan Lovely's Jekyll Site

## Includes

### Responsive Image List 

Will create a list of images for these files in the folder `/photos/india/_full/`: 

- `Bylakupee-Namdroling-Monastery-01.jpg`
- `Bylakupee-Namdroling-Monastery-02.jpg`
- `Bylakupee-Namdroling-Monastery-03.jpg`

```
---
imgs:
  - 01
  - 02
  - 03
---

{% include imgs.html path="/photos/india/_full/Bylakupee-Namdroling-Monastery" %}
```
