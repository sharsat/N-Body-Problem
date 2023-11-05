from scipy.optimize import newton
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

r_1 = 50
r_2 = 0
r_3 = 0

v_1 = 0
v_2 = -2
v_3 = 0


r0 = np.sqrt(r_1 **2 + r_2 ** 2 + r_3 **2) 
v0 = np.sqrt(v_1**2 + v_2 ** 2 + v_3 **2) 
m1 = 20
m2 = 10
k = 100
mu = k*(m1+m2)
alpha = 2 / r0 - v0**2 / mu
v_r0 = 0 # (\vec(r0) * \vec(v)) / betrag(r0)
delta_t = 0.001


def stumpff_0(z):
    if z > 0:
        return (1 - np.cos(np.sqrt(z))) / z
    elif z < 0:
        return (np.cosh(np.sqrt(-z)) - 1) / (-z)
    else:
        return 1/2

def stumpff_1(z):
    if z > 0:
        return (np.sqrt(z) - np.sin(np.sqrt(z))) / np.sqrt(z)**3
    elif z < 0:
        return (np.sinh(np.sqrt(-z)) - np.sqrt(-z)) / np.sqrt(-z)**3
    else:
        return 1/6

def universal_kepler(chi, r, v_r0, alpha, delta_t, mu):
    z = alpha * chi**2
    first_term = r0 * v_r0 / np.sqrt(mu) * chi**2 * stumpff_0(z)
    second_term = (1 - alpha * r0) * chi**3 * stumpff_1(z)
    third_term = r0 * chi
    fourth_term = np.sqrt(mu) * delta_t
    return first_term + second_term + third_term - fourth_term

def d_universal_d_chi(chi, r0, v_r0, alpha, delta_t, mu):
    z = alpha * chi**2
    first_term = r0 * v_r0 / np.sqrt(mu) * chi * (1 - z * stumpff_1(z))
    second_term = (1 - alpha * r0) * chi**2 * stumpff_0(z)
    third_term = r0
    return first_term + second_term + third_term


def chi_0(x):
    return np.sqrt(mu) * np.abs(alpha) * x

def f(x):
    return 1 - x**2/r0*stumpff_0(alpha*x**2)

def g(x):
    return delta_t - x**3*stumpff_1(alpha*x**2)/np.sqrt(mu)


result = ""

for b in range(300):
    delta_t = b+1
    chi = newton(
    func=universal_kepler,
    fprime=d_universal_d_chi,
    x0=chi_0(delta_t),
    args=(r0, v_r0, alpha, delta_t, mu)
    )

    fC = f(chi)
    gC = g(chi)
    #result += str(r_1*fC + v_1*gC) + " " + str(r_2*fC + v_2*gC) + " " + str(r_3*fC + v_3*gC) + "\n"
    result += str(r_1*fC + v_1*gC) + "," + str(r_2*fC + v_2*gC) + "," + str(r_3*fC + v_3*gC) + ","


print(result[:-1])
coordinates_str = result[:-1].split(',')
coordinates_str = [float(coord) for coord in coordinates_str]
points = [(coordinates_str[i:i+3]) for i in range(0, len(coordinates_str), 3)]
x = [point[0] for point in points]
y = [point[1] for point in points]
z = [point[2] for point in points]

# Create a 3D plot
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.plot(x, y, z, c='k', label='Line')

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Line Plot')

plt.show()
