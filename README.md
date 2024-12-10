# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

TSP comparison Table:

<img src="TSP-Comparison Table.png">

For the first 6 map sizes, Held-Karp and Local search have equal tour lengths, but after that they deviate, local search always has more tours than Held-Karp.

I ran the program multiple times throughout the day, and for each matrix size I benchmarked both Held-Karp and local search to find the limit.

I found after raising the input size to around 20, the Held-Karp search algorithm would time out.
I left my PC on over an hour and I never got an input size over 20.

I found after raising the input size to around 200, the Local search algorithm would time out.
I constantly got large values around input size 200.

I found that since the Held-Karp grew at a faster rate, it reaches it's limit much faster than local.
Held-Karp search is better for smaller data sets, and when you need more accurate answers.
Local search is better for getting the solution quickly at the cost of accuracy.

The first 5 matrixes both algorithms were pretty close in time, but after that they deviate heavily.
Held-Karp always looks for the most optimal path so it takes more time to find.
Local search has much more paths it can take due to exploring non optimal paths.

“I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.”
