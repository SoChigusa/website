---

title: 'fastjet を使って解析'
date: '2020-01-02'
description: 'fastjet の応用的な使い方に関する tips'
image: 'ISO_C++_Logo.svg'

---

## no template named 'auto_ptr' in namespace 'std' ##

`-std=c++11` で `auto_ptr` が廃止された問題。
`ClusterSequence.hh` にも記述がある通り、これを使用しない方向でコンパイルさせれば良いので、`config_auto.h` 内

``` c++
/* compile the deprecated parts of the interface using auto-ptr */
#ifndef FASTJET_HAVE_AUTO_PTR_INTERFACE
/* #define FASTJET_HAVE_AUTO_PTR_INTERFACE */
#endif
```

のように該当箇所をコメントアウト。
