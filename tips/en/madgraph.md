---

title: 'Install and simulate with Madgraph'
date: '2024-04-24'
description: 'Tips on how to introduce, use, and solve problems about Madgraph'
image: 'Feynmann_Diagram_Gluon_Radiation.svg'

---

## Installation

First of all, edit the global setting in `input/mg5_configuration.txt` such that the automatic browser opening is disabled:

``` shell
 automatic_html_opening = False
```

Next, install all the necessary dependencies as

``` shell
 install boost
 install lhapdf6
 install zlib
 install hepmc
 install pythia8
```

To install `delphes`, we need to add the following lines to `~/.bash_profile`; without the following lines, madgraph just outputs error messages with detailed description of what to do and does not process installation.

``` shell
export ROOTSYS=<root installation path>
export PATH=$PATH:$ROOTSYS/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ROOTSYS/lib
export DYLD_LIBRARY_PATH=$DYLD_LIBRARY_PATH:$ROOTSYS/lib
```

After executing `source ~/.bash_profile`, relaunch `bin/mg5_aMC` and

``` shell
install Delphes
```

For macOS > 10, a compile error detailed [below](#delphes-on-mac-os--10) arises.
We need to fix it according to the description there.
**(2024/4/24)Fix is still needed!**

## How to use

If Madgraph requires other dependencies when executing the code, I often hit enter without any thoughts.
Here are some examples of the workflow.

1. LO Drell-Yan

``` shell
 p = p b b~
 generate p p > e+ e-
 output pp2ee
 launch
```

2. NLO Drell-Yan

``` shell
 import model sm-no_b_mass
 generate p p > e+ e- [QCD]
 output pp2eeNLO
 launch
```

## Delphes on Mac OS > 10

I encountered the following error when I tried to install Delphes on Mac (arm) OS 12.


``` shell
>> Building libDelphesNoFastJet.so
clang: error: no such file or directory: 'libDelphesNoFastJet.so'
make: *** [libDelphesNoFastJet.so] Error 1
```

According to [this Q&A](https://cp3.irmp.ucl.ac.be/projects/delphes/ticket/1542), this error is caused by  `<Delphes installation>/doc/Makefile.arch` only compatible with Mac OS <= 10.

This error is realized with Delphes downloaded as


``` shell
wget http://cp3.irmp.ucl.ac.be/downloads/Delphes-3.5.0.tar.gz
```

while there is no such error for the newest version obtained with

``` shell
git clone https://github.com/delphes/delphes.git
```

So I recommend to use the latter.
When you would like to work with MadGraph -> Delphes workflow, Madgraph tries to use Delphes downloaded in the former method and gives som errors.
You should first escape from `./bin/mg5_aMC` and replace the file `Makefile.arch` in `<MadGraph installation>/Delphes/doc/` to the one included in the newest version of Delphes and manually redo `make`.
It makes you compile Delphes successfully and now the workflow can be used with no problem.

## (2019/6/26) jet matching

Depending on the version of Madgraph, maybe, you should edit `run_card.dat` when you would like to perform the jet matching.

``` shell
1 = ickkw            ! 0 no matching, 1 MLM
```

[The help document](（<https://cp3.irmp.ucl.ac.be/projects/madgraph/wiki/Matching>）) further tells us that the option `2` corresponds to the CKKW matching.
These options forces Madgraph to calculate the hard process for a sufficiently large phase space that has a sizable overlap with the phase space covered by the parton shower calculation.
After the parton showering, we can obtain the correct cross section after the jet matching.

## (2019/4/26) Use the interpreter for repeated calculation etc

For example, if you would like to launch the process several times with some given names, you should prepare a text file named, e.g., `launch_several_times.txt`, with the content

``` text
launch pp2gogo2 -n 6TeV_0
launch pp2gogo2 -n 6TeV_1
launch pp2gogo2 -n 6TeV_2
```

Then you can execute it with

``` shell
./bin/mg5_aMC launch_several_times.txt
```

to obtain the three results.

## (2019/04/21) Change default values of the model parameters

For exmample, if you would like to consider the b-quark PDF in the SM, the b quark should be massless for the consistency of the calculation, so you should first

``` shell
import model SM-no_b_mass
```

This command uses the content of `**MG5**/model/sm/restrict_no_b_mass.dat` as `param_card.dat`.
Similarly, for example, if you would like to use an anomally-mediated symmetry breaking with some given gravitino mass etc as a benchmark point used by default, you can copy your `param_card.dat` to, e.g., `**MG5**/model/MSSM_SLHA2/restrict_AMSB.dat`, and use it with

``` shell
import model MSSM_SLHA2-AMSB
```

In the preparation of the `param_card.dat`, it is also convenient to use the command such as

``` shell
compute_widths n2 go --body_decay=2.0025
```

to compute the decay width of the given particles.
After executing this command, a file `param_card.dat` is generated in the model directory that includes the computed decay widths.

## (2018/11/20) User defined cuts

If you would like to define a new cut variable and condition used at the stage of the event generation, one way is to directly edit the fortran source file of Madgraph.
Each process has the file `SubProcesses/cuts.f`; just edit it as

``` fortran
C***************************************************************
C***************************************************************
C PUT HERE YOUR USER-DEFINED CUTS
C***************************************************************
C***************************************************************

      do i=1,nexternal          ! loop over all external particles
         if(istatus(i).eq.1 .and. ! final state particle
     &        (ipdg(i).eq.12 .or. ipdg(i).eq.14 .or. ipdg(i).eq.16)) then ! neutrino
            do j=1,nexternal       ! loop over all external particles
               if (is_a_lp(j)) then ! l+
                  if (2d0 * sqrt(p(1,i)**2+p(2,i)**2) * sqrt(p(1,j)**2+p(2,j)**2)
     &                 - 2d0*(p(1,i)*p(1,j)+p(2,i)*p(2,j))
     &                 .lt. 480d0**2) then ! transverse mass cut at 480GeV
                     passcuts_user=.false.
                     return
                  endif
               endif
            enddo
         endif
      enddo

      return
      end
```

The above example puts a cut on the transverse mass between the lepton and neutrino in the final state.
Note that a too strong cut can cause a problem related to the precision of the Monte Carlo integration.
See [here](https://answers.launchpad.net/mg5amcnlo/+question/446723) for further discussions.


## (2018/08/24) aMCatNLOError : Some tests failed, run cannot continue

You can identify the test that ends up with the error by carefully reading the error messages.
In my case, the Soft / Collinear test was failed, that lead me to look inside `SubProcesses/test_soft_col_limits.f`.
This [Q&A](https://answers.launchpad.net/mg5amcnlo/+question/255905) told me that the existence of many different energy scales would enlarge the numerical instability and tend to cause this kind of problem.
I solved this problem by loosing the test condition by editing the fortran source as

``` fortran
      parameter       (max_fail=(LARGE ENOUGH VALUE))
```

## (2018/08/19) Use systematics module

In order to use the systematics module for the estimation of various systematic errors, you need the python interface of *LHAPDF*.
I encountered a problem with "unkonwn library" with the default *LHAPDF*, so manually reinstalled it.
Correspondingly, I had to edit `input/mg5_configuration.txt` to set the *LHAPDF* path as

```shell
lhapdf = /usr/local/bin/lhapdf-config
```

and reinstalled pythia just in case.

Before launching the process, you need to edit `run_card.dat` as

``` shell
 lhapdf = pdlabel ! PDF set
 True   = reweight_scale ! Reweight to get scale variation using the
 True   = reweight_pdf ! Reweight to get PDF uncertainty. Should be a
 True   = store_rwgt_info ! Store info for reweighting in LHE file
 systematics = systematics_program
 ['--mur=0.5,1,2', '--muf=0.5,1,2', '--pdf=errorset'] = systematics_arguments ! see: https://cp3.irmp.ucl.ac.be/projects/madgraph/wiki/Systematics#Systematicspythonmodule
```

This gives you the estimation of errors associated with the choice of renormalization scales and PDFs.
