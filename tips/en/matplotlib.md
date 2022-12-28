---

title: 'matplotlib cheat sheet'
date: '2020-12-27'
description: 'Tips on how to make plots with matplotlib'
image: 'Python_logo_and_wordmark.svg'

---

## Fundamentals ##

Import `matplotlib` and prepare for plotting.

``` python
import matplotlib.pyplot as plt

fig = plt.figure()
ax  = fig.add_subplot(1,1,1)
```

Use the `ax` instance of the class `matplotlib.axes.Axes` as follows.
Also, we can set label texts, legends and tick labels as

``` python
ax.set_title(r'title $\LaTeX$', size=25)
ax.set_xlabel('xlabel', size=25)
ax.set_ylabel('ylabel', size=25)
ax.legend(loc="lower right", fontsize=20)
ax.tick_params(labelsize=20)
```

Finally, save the plot with the PDF format as

``` python

plt.tight_layout()
plt.savefig('hoge.pdf', bbox_inches='tight')
```

The LaTeX style texts can be used by default as `r'$...$'`.
We can also change the font with

``` python
from matplotlib import rc

rc('mathtext', **{'rm': 'serif',
    'it': 'serif:itelic',
    'bf': 'serif:bold',
    'fontset': 'cm'})
```

## Preparation of the plot data ##

Assume that the plot data is prepared with a csv-like format.
In order to import it with `numpy`, type

``` python
data = np.loadtxt('hoge.dat', skiprows=1, usecols=range(2))
x = data[:,0]
y = data[:,1]
```

The `skiprows` option excludes an arbitrary number of lines treating them as header information.
We can also use `pandas` to import data.
Depending on whether the delimiter of the data file is spaces or a tab, type

``` python
data = pd.read_csv('hoge.dat')
data = pd.read_table('hoge.dat')
```

respectively.
Then, we can define the names of the variables in the header of the data file and use them to access data through `data['name']`.
Conversion from the `pandas` data to `numpy` array available with

``` python
nplist = data.values
```

## 1D plot ##

Prepare the list of data corresponding to both the x- and y-axes and use the `plot` function as

``` python
ax.plot(xlist, ylist, color='r', linestyle='-', linewidth=2, label='hoge')
```

The `label` option is used for legends.
Set the range of values for each axis with

``` python
ax.set_xlim(xmin, xmax)
ax.set_ylim(ymin, ymax)
```

Set log scale with

``` python
ax.set_xscale('log')
ax.set_yscale('log')
```

We can also set the position and labels of the ticks as

``` python
ax.set_xticks([0, 0.5, 1, 1.5])
ax.set_yticks([0, 0.5, 1, 1.5])
ax.set_yticklabels(['0.0', '0.5', '1.0', '1.5'])
```

Use the `numpy` array to plot an auxiliary line;

``` python
x = np.linspace(xmin, xmax, npts)
y = np.linspace(ymin, ymax, npts)
```

## Contour plot ##

We need to prepare x,y,z values saved in two-dimensional lists.
To convert one-dimensional lists to two-dim ones, we can use the `ndarray.reshape` function;

``` python
x,y,z = data[:,1].reshape(ny,nx), data[:,2].reshape(ny,nx), data[:,3].reshape(ny,nx)
```

To make a contour plot,

``` python
cs = ax.contour(x, y, z, levels=[z1, z2, z3], colors='b', linestyles='-')
h,_   = cs.legend_elements()
ax.legend([h[0]], ['legend'], fontsize=20)
```

In addition to the legends, we can show the corresponding z-values in the middle of each contour with

``` python
ax.clabel(cs, fmt='%d')
ax.clabel(cs2, fmt='%.1E')
```

Filling the area between contours with

``` python
ax.contourf(x, y, z, levels=[zmin,zmax], alpha=0.3, colors='gray')
```

which fills `zmin < z < zmax` with the gray color.
Sometimes it is convenient to start from a non-white color background with

``` python
ax.set_axis_bgcolor('green')
```

## Histogram ##

We prepare a one-dimensional list of data and type

``` python
ax.hist(data, bins=nbin, range=(xmin, xmax), color='m', ec='black', label='legend')
```

The `ec` option fixes the edge color of the histogram.
We can set weights of data by preparing another list of weights named `weights` and add an option `weights=weights` to the above command.

Use the log-scaled x-axis with

``` python
ax.hist(prob, bins=np.logspace(-6, 0, 50), color='b', ec='black', log=True)
ax.set_xscale('log')
```

## Change the size/aspect ratio of the plot ##

``` python
fig = plt.figure(figsize=[4,2.25])
```

## Plot a customized coordinate axis ##

``` python
# removing the default axis on all sides:
for side in ['bottom','right','top','left']:
    ax.spines[side].set_visible(False)

# removing the axis ticks
plt.xticks([]) # labels
plt.yticks([])
ax.xaxis.set_ticks_position('none') # tick markers
ax.yaxis.set_ticks_position('none')

# get width and height of axes object to compute
# matching arrowhead length and width
dps = fig.dpi_scale_trans.inverted()
bbox = ax.get_window_extent().transformed(dps)
width, height = bbox.width, bbox.height

# manual arrowhead width and length
hw = 1./20.*(ymax-ymin)
hl = 1./20.*(xmax-xmin)
lw = 1. # axis line width
ohg = 0.3 # arrow overhang

# compute matching arrowhead length and width
yhw = hw/(ymax-ymin)*(xmax-xmin)* height/width
yhl = hl/(xmax-xmin)*(ymax-ymin)* width/height

# draw x and y axis
ax.arrow(xmin, 0, xmax-xmin, 0., fc='k', ec='k', lw = lw,
         head_width=hw, head_length=hl, overhang = ohg,
         length_includes_head= True, clip_on = False)
ax.arrow(0, ymin, 0., ymax-ymin, fc='k', ec='k', lw = lw,
         head_width=yhw, head_length=yhl, overhang = ohg,
         length_includes_head= True, clip_on = False)
```

After plotting a coordinate axis, we can plot an arbitrary function with `ax.plot`, or draw a circle with

``` python
phi = patches.Circle(xy=(x, y), radius=r, fc='green')
ax.add_patch(phi)
```

which is useful for the slide preparation.

## Annotation ##

Plot a star marker with

``` python
ax.plot(x, y, '*', markersize=15, color='black', clip_on=False)
```

The `clip_on=False` option allows the marker to stick out from the plot range.
Annotation with/without arrows

``` python
ax.annotate('Text', xy=[x, y], xytext=[xtext, ytext], arrowprops=dict(width=4, color='b'), fontsize=30, color='b')
ax.annotate('Text', xy=(xtext, ytext), fontsize=20)
```

## Divide the plot into pieces ##

The `matplotlib.axes.Axes` instances correspond to subplots can be generated with

``` python
ax1  = fig.add_subplot(N,x,y)
```

where `N` is the number of subplots, while `x` and `y` are the coordinate of the subplot `ax1` in the whole figure.

## Customized legends ##

``` python
ax.legend(loc='upper right', fontsize=15, borderaxespad=0).get_frame().set_alpha(1)
```

The `borderaxespad` option adjusts the padding between the legend and the circumference of the plot.
By default, the legend is translucent in python3.
We can use `.get_frame().set_alpha(1)` to make it opaque.

## Comic-style plot ##

``` python
plt.xkcd()
```
