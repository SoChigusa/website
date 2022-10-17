---

title: 'Delphes application'
date: '2020-01-02'
description: 'Tips on the advanced use of Delphes'
image: 'Tcl-powered.svg'

---

## Introduction

As their extension shows, the detector cards of Delphes is written in terms of the script language named *tcl*.

## Customize how FastJet operates

[Here](https://cp3.irmp.ucl.ac.be/projects/delphes/wiki/WorkBook/ExternalFastJet) is a useful reference.
Basically, you can copy `ExternalFastJetHepMC.cpp` and edit it to fit your purpose.
One problem might be that only the detector card of CMS `cards/delphes_card_CMS_NoFastJet.tcl​` is compatible with the external FastJet operation by default.
In my case, I wanted to use the detector card of FCC-hh, so I edited `cards/FCC/FCChh.tcl​` so that it accepts the use of external FastJet.

What we need to do is to eliminate the declaration and definition related to the unnecessary modules related to jets.
Concretely, I eliminated

``` tcl
  GenJetFinder02
  GenJetFinder04
  GenJetFinder08

  FastJetFinder02
  FastJetFinder04
  FastJetFinder08

  CaloJetFinder02
  CaloJetFinder04
  CaloJetFinder08

  TrackJetFinder02
  TrackJetFinder04
  TrackJetFinder08

  JetEnergyScale

  JetFlavorAssociation

  BTagging
  CTagging
  TauTagging
```

from `cards/FCC/FCChh.tcl​`.
I also deleted the `TreeWriter` module because it was necessary due to some reason that I did not know.
