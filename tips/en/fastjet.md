---

title: 'Analyze with fastjet'
date: '2020-01-02'
description: 'Tips on the advanced use of fastjet'
image: 'ISO_C++_Logo.svg'

---

## no template named 'auto_ptr' in namespace 'std'

This error message is sourced from the abolition of `auto_ptr` in `-std=c++11`.
As is described in `ClusterSequence.hh`, you need to compile the source files without using it.
Just comment out the related part in `config_auto.h` as

``` c++
/* compile the deprecated parts of the interface using auto-ptr */
#ifndef FASTJET_HAVE_AUTO_PTR_INTERFACE
/* #define FASTJET_HAVE_AUTO_PTR_INTERFACE */
#endif
```
