angular.module('adventureApp').constant('earthConstants', {
    angelScale: 150,
    baseCost: [4, 60, 720, 8640, 103680, 1244160, 14929920, 179159040, 2149908480, 25798901760],
    basePower: [1.07, 1.15, 1.14, 1.13, 1.12, 1.11, 1.1, 1.09, 1.08, 1.07],
    baseProfit: [1, 60, 540, 4320, 51840, 622080, 7464960, 89579520, 1074954240, 29668737024],
    baseSpeed: [0.6, 3, 6, 12, 24, 96, 384, 1536, 6144, 36864],
    hasMegaTickets: true,
    investments: [
      ['Lemon', 1, false, 0, 0, 0, 0],
      ['Newspaper', 0, false, 0, 0, 0, 0],
      ['Carwash', 0, false, 0, 0, 0, 0],
      ['Pizza', 0, false, 0, 0, 0, 0],
      ['Donut', 0, false, 0, 0, 0, 0],
      ['Shrimp', 0, false, 0, 0, 0, 0],
      ['Hockey', 0, false, 0, 0, 0, 0],
      ['Movies', 0, false, 0, 0, 0, 0],
      ['Bank', 0, false, 0, 0, 0, 0],
      ['Oil', 0, false, 0, 0, 0, 0]
    ],
    unlocks: [
        [[25, [1, 2]],[50, [1, 2]],[100, [1, 2]],[200, [1, 2]],[300, [1, 2]],[400, [1, 2]],[500, [0, 4]],[600, [0, 4]],[700, [0, 4]],[800, [0, 4]],[900, [0, 4]],[1000, [0, 5]],[1100, [0, 4]],[1200, [0, 4]],[1300, [0, 4]],[1400, [0, 4]],[1500, [0, 4]],[1600, [0, 4]],[1700, [0, 4]],[1800, [0, 4]],[1900, [0, 4]],[2000, [0, 5]],[2250, [0, 2]],[2500, [0, 2]],[2750, [0, 2]],[3000, [0, 5]],[3250, [0, 2]],[3500, [0, 2]],[3750, [0, 2]],[4000, [0, 5]],[4250, [0, 2]],[4500, [0, 2]],[4750, [0, 2]],[5000, [0, 5]],[5250, [0, 3]],[5500, [0, 3]],[5750, [0, 3]],[6000, [0, 5]],[6250, [0, 3]],[6500, [0, 3]],[6750, [0, 3]],[7000, [0, 5]],[7000, [0, 3]],[7250, [0, 3]],[7500, [0, 3]],[7777, [0, 3]],[8000, [0, 3]],[8200, [0, 3]],[8400, [0, 3]],[8600, [0, 3]],[8800, [0, 3]],[9000, [0, 3]],[9100, [0, 3]],[9200, [0, 3]],[9300, [0, 3]],[9400, [0, 3]],[9500, [0, 3]],[9600, [0, 3]],[9700, [0, 3]],[9800, [0, 3]],[9999, [0, 1.9999]],[10000, [0, 5]]],
        [[25, [3, 2]],[50, [3, 2]],[100, [3, 2]],[125, [0, 2]],[150, [4, 2]],[175, [6, 2]],[200, [3, 2]],[225, [8, 2]],[250, [0, 3]],[275, [4, 3]],[300, [3, 2]],[325, [6, 3]],[350, [8, 3]],[375, [0, 4]],[400, [3, 2]],[425, [4, 4]],[450, [6, 4]],[475, [8, 4]],[500, [10, 11]],[525, [0, 5]],[550, [4, 5]],[575, [6, 5]],[600, [12, 11]],[625, [8, 5]],[650, [0, 6]],[675, [4, 6]],[700, [14, 11]],[725, [6, 6]],[750, [8, 6]],[775, [0, 3]],[800, [16, 11]],[825, [4, 7]],[850, [6, 7]],[875, [8, 7]],[900, [18, 11]],[925, [10, 7]],[950, [12, 7]],[975, [14, 7]],[1000, [2, 7777777]],[1025, [16, 7]],[1050, [18, 7]],[1075, [4, 8]],[1100, [6, 8]],[1125, [8, 8]],[1150, [10, 8]],[1175, [12, 8]],[1200, [14, 8]],[1225, [16, 8]],[1250, [18, 8]],[1300, [2, 7777]],[1350, [0, 9]],[1400, [4, 9]],[1450, [6, 9]],[1500, [8, 9]],[1550, [10, 9]],[1600, [12, 9]],[1650, [14, 9]],[1700, [16, 9]],[1750, [18, 9]],[1800, [10, 10]],[1850, [12, 10]],[1900, [14, 10]],[1950, [16, 10]],[2000, [2, 7777]],[2100, [4, 15]],[2200, [6, 15]],[2300, [8, 15]],[2400, [10, 15]],[2500, [2, 777]],[2600, [14, 15]],[2700, [16, 15]],[2800, [18, 15]],[2900, [0, 15]],[3000, [2, 777]],[3100, [4, 20]],[3200, [12, 20]],[3300, [16, 20]],[3400, [18, 20]],[3500, [2, 777]],[3600, [12, 25]],[3700, [14, 25]],[3800, [16, 25]],[3900, [18, 25]],[4000, [2, 30]],[4100, [0, 30]],[4200, [4, 30]],[4300, [6, 30]],[4400, [8, 30]],[4500, [10, 30]],[4600, [12, 30]],[4700, [14, 30]],[4800, [16, 30]],[4900, [18, 30]],[5000, [2, 50]],[5100, [2, 50]],[5200, [2, 50]],[5300, [2, 50]],[5400, [2, 50]]],
        [[25, [5, 2]],[50, [5, 2]],[100, [5, 2]],[200, [5, 2]],[300, [5, 2]],[400, [5, 2]],[500, [4, 2]],[600, [4, 2]],[700, [4, 2]],[800, [4, 2]],[900, [4, 2]],[1000, [4, 3]],[1100, [4, 2]],[1200, [4, 2]],[1300, [4, 2]],[1400, [4, 2]],[1500, [4, 2]],[1600, [4, 2]],[1700, [4, 2]],[1800, [4, 2]],[1900, [4, 2]],[2000, [4, 5]],[2100, [4, 3]],[2200, [4, 3]],[2300, [4, 3]],[2400, [4, 3]],[2500, [4, 3]],[2600, [4, 3]],[2700, [4, 3]],[2800, [4, 3]],[2900, [4, 3]],[3000, [4, 3]],[3100, [4, 3]],[3200, [4, 3]],[3300, [4, 3]],[3400, [4, 3]],[3500, [4, 3]],[3600, [4, 3]],[3700, [4, 3]],[3800, [4, 3]],[3900, [4, 3]],[4000, [4, 5]],[4100, [4, 3]],[4200, [4, 3]],[4300, [4, 3]],[4400, [4, 3]],[4500, [4, 3]],[4600, [4, 3]],[4700, [4, 3]],[4800, [4, 3]],[4900, [4, 3]],[5000, [4, 5]],[5250, [4, 3]],[5500, [4, 3]]],
        [[25, [7, 2]],[50, [7, 2]],[100, [7, 2]],[200, [7, 2]],[300, [7, 2]],[400, [7, 2]],[500, [6, 2]],[600, [6, 2]],[700, [6, 2]],[800, [6, 2]],[900, [6, 2]],[1000, [6, 3]],[1100, [6, 2]],[1200, [6, 2]],[1300, [6, 2]],[1400, [6, 2]],[1500, [6, 2]],[1600, [6, 2]],[1700, [6, 2]],[1800, [6, 2]],[1900, [6, 2]],[2000, [6, 5]],[2100, [6, 3]],[2200, [6, 3]],[2300, [6, 3]],[2400, [6, 3]],[2500, [6, 3]],[2600, [6, 3]],[2700, [6, 3]],[2800, [6, 3]],[2900, [6, 3]],[3000, [6, 3]],[3100, [6, 3]],[3200, [6, 3]],[3300, [6, 3]],[3400, [6, 3]],[3500, [6, 3]],[3600, [6, 3]],[3700, [6, 3]],[3800, [6, 5]],[3900, [6, 3]],[4000, [6, 5]],[4100, [6, 3]],[4200, [6, 3]],[4300, [6, 3]],[4400, [6, 3]],[4500, [6, 3]],[4600, [6, 3]],[4700, [6, 3]],[4800, [6, 3]],[4900, [6, 3]],[5000, [6, 5]],[5250, [6, 3]],[5500, [6, 3]],[5750, [6, 3]]],
        [[25, [9, 2]],[50, [9, 2]],[100, [9, 2]],[200, [9, 2]],[300, [9, 2]],[400, [9, 2]],[500, [8, 2]],[600, [8, 2]],[700, [8, 2]],[800, [8, 2]],[900, [8, 2]],[1000, [8, 3]],[1100, [8, 2]],[1200, [8, 2]],[1300, [8, 2]],[1400, [8, 2]],[1500, [8, 2]],[1600, [8, 2]],[1700, [8, 2]],[1800, [8, 2]],[1900, [8, 2]],[2000, [8, 5]],[2100, [8, 3]],[2200, [8, 3]],[2300, [8, 3]],[2400, [8, 3]],[2500, [8, 3]],[2600, [8, 3]],[2700, [8, 3]],[2800, [8, 3]],[2900, [8, 3]],[3000, [8, 3]],[3100, [8, 3]],[3200, [8, 3]],[3300, [8, 3]],[3400, [8, 3]],[3500, [8, 3]],[3600, [8, 3]],[3700, [8, 3]],[3800, [8, 3]],[3900, [8, 3]],[4000, [8, 3]],[4100, [8, 3]],[4200, [8, 3]],[4300, [8, 3]],[4400, [8, 3]],[4500, [8, 3]],[4750, [8, 3]],[5000, [8, 3]],[5250, [8, 3]],[5500, [8, 3]],[5750, [8, 3]],[6000, [8, 3]],[6250, [8, 3]]],
        [[25, [11, 2]],[50, [11, 2]],[100, [11, 2]],[200, [11, 2]],[300, [11, 2]],[400, [11, 2]],[500, [10, 2]],[600, [10, 2]],[700, [10, 2]],[800, [10, 2]],[900, [10, 2]],[1000, [10, 3]],[1100, [10, 2]],[1200, [10, 2]],[1300, [10, 2]],[1400, [10, 2]],[1500, [10, 2]],[1600, [10, 2]],[1700, [10, 2]],[1800, [10, 2]],[1900, [10, 2]],[2000, [10, 5]],[2100, [10, 3]],[2200, [10, 3]],[2300, [10, 3]],[2400, [10, 3]],[2500, [10, 3]],[2600, [10, 3]],[2700, [10, 3]],[2800, [10, 3]],[2900, [10, 3]],[3000, [10, 3]],[3250, [10, 5]],[3500, [10, 5]],[3750, [10, 3]],[4000, [10, 5]],[4250, [10, 3]],[4500, [10, 5]],[4750, [10, 3]],[5000, [10, 5]],[5250, [10, 3]],[5500, [10, 3]],[5750, [10, 3]],[6000, [10, 5]],[6250, [10, 3]],[6500, [10, 5]]],
        [[25, [13, 2]],[50, [13, 2]],[100, [13, 2]],[200, [13, 2]],[300, [13, 2]],[400, [13, 2]],[500, [12, 2]],[600, [12, 2]],[700, [12, 2]],[800, [12, 2]],[900, [12, 2]],[1000, [12, 3]],[1100, [12, 2]],[1200, [12, 2]],[1300, [12, 2]],[1400, [12, 2]],[1500, [12, 2]],[1600, [12, 2]],[1700, [12, 2]],[1800, [12, 2]],[1900, [12, 2]],[2000, [12, 5]],[2100, [13, 2]],[2200, [12, 3]],[2300, [13, 2]],[2400, [12, 3]],[2500, [13, 2]],[2600, [12, 3]],[2700, [13, 2]],[2800, [12, 3]],[2900, [12, 3]],[3000, [12, 3]],[3250, [12, 3]],[3500, [12, 3]],[3750, [12, 3]],[4000, [12, 5]],[4250, [12, 3]],[4500, [12, 3]],[4750, [12, 3]],[5000, [12, 7]],[5250, [12, 3]],[5500, [12, 3]],[5750, [12, 3]],[6000, [12, 7]],[6250, [12, 3]],[6500, [12, 3]],[6750, [12, 3]],[7000, [12, 7]]],
        [[25, [15, 2]],[50, [15, 2]],[100, [15, 2]],[200, [15, 2]],[300, [15, 2]],[400, [15, 2]],[500, [14, 2]],[600, [14, 2]],[700, [14, 2]],[800, [14, 2]],[900, [14, 2]],[1000, [14, 3]],[1100, [14, 2]],[1200, [14, 2]],[1300, [14, 2]],[1400, [14, 2]],[1500, [14, 2]],[1600, [14, 2]],[1700, [14, 2]],[1800, [14, 2]],[1900, [14, 2]],[2000, [14, 5]],[2100, [15, 2]],[2200, [14, 2]],[2300, [15, 2]],[2400, [14, 2]],[2500, [15, 2]],[2600, [14, 2]],[2700, [15, 2]],[2800, [14, 2]],[2900, [14, 2]],[3000, [14, 2]],[3250, [15, 2]],[3500, [14, 2]],[3750, [14, 2]],[4000, [14, 2]],[4250, [14, 3]],[4500, [14, 3]],[4750, [14, 3]],[5000, [14, 5]],[5250, [14, 3]],[5500, [14, 3]],[5750, [14, 3]],[6000, [14, 9]],[6250, [14, 3]],[6500, [14, 3]],[6750, [14, 3]],[7000, [14, 9]],[7250, [14, 3]],[7500, [14, 3]],[7750, [14, 3]]],
        [[25, [17, 2]],[50, [17, 2]],[100, [17, 2]],[200, [17, 2]],[300, [17, 2]],[400, [17, 2]],[500, [16, 2]],[600, [16, 2]],[700, [16, 2]],[800, [16, 2]],[900, [16, 2]],[1000, [16, 3]],[1100, [16, 2]],[1200, [16, 2]],[1300, [16, 2]],[1400, [16, 2]],[1500, [16, 2]],[1600, [16, 2]],[1700, [16, 2]],[1800, [16, 2]],[1900, [16, 2]],[2000, [16, 5]],[2250, [17, 2]],[2500, [17, 2]],[2750, [17, 2]],[3000, [17, 2]],[3250, [17, 2]],[3500, [17, 2]],[3750, [17, 2]],[4000, [17, 2]],[4250, [16, 3]],[4500, [16, 3]],[4750, [16, 3]],[5000, [16, 5]],[5250, [16, 5]],[5500, [16, 3]],[5750, [16, 3]],[6000, [16, 5]],[6250, [16, 3]],[6500, [16, 3]],[6750, [16, 3]],[7000, [16, 5]],[7250, [16, 3]],[7500, [16, 3]],[7750, [16, 3]],[8000, [16, 5]],[8250, [16, 3]],[8500, [16, 3]]],
        [[25, [19, 2]],[50, [19, 2]],[100, [19, 2]],[200, [19, 2]],[300, [19, 2]],[400, [19, 2]],[500, [18, 2]],[600, [18, 2]],[700, [18, 2]],[800, [18, 2]],[900, [18, 2]],[1000, [18, 3]],[1100, [18, 2]],[1200, [18, 2]],[1300, [18, 2]],[1400, [18, 2]],[1500, [18, 2]],[1600, [18, 2]],[1700, [18, 2]],[1800, [18, 2]],[1900, [18, 2]],[2000, [18, 5]],[2250, [19, 2]],[2500, [19, 2]],[2750, [19, 2]],[3000, [19, 2]],[3250, [19, 2]],[3500, [19, 2]],[3750, [19, 2]],[4000, [19, 2]],[4250, [19, 2]],[4500, [19, 2]],[4750, [19, 2]],[5000, [19, 2]],[5250, [18, 3]],[5500, [18, 3]],[5750, [18, 3]],[6000, [18, 5]],[6250, [18, 3]],[6500, [18, 3]],[6750, [18, 3]],[7000, [18, 7]],[7250, [18, 3]],[7500, [18, 3]],[7750, [18, 3]],[8000, [18, 3]],[8250, [18, 3]],[8500, [18, 3]],[8750, [18, 3]],[9000, [18, 7]],[9250, [18, 3]],[9500, [18, 3]],[9750, [18, 3]]],
        [[25, [21, 2]],[50, [21, 2]],[100, [21, 2]],[200, [21, 2]],[300, [21, 2]],[400, [21, 2]],[500, [20, 2]],[600, [20, 2]],[666, [20, 2]],[700, [20, 2]],[777, [20, 2]],[800, [20, 2]],[900, [20, 2]],[1000, [20, 2]],[1100, [20, 2]],[1111, [20, 2]],[1200, [20, 2]],[1300, [20, 2]],[1400, [20, 2]],[1500, [20, 2]],[1600, [20, 2]],[1700, [20, 2]],[1800, [20, 2]],[1900, [20, 2]],[2000, [20, 2]],[2100, [20, 2]],[2200, [20, 2]],[2222, [20, 2]],[2300, [20, 2]],[2400, [20, 2]],[2500, [20, 2]],[2600, [20, 2]],[2700, [20, 2]],[2800, [20, 2]],[2900, [20, 2]],[3000, [20, 2]],[3100, [20, 2]],[3200, [20, 2]],[3300, [20, 2]],[3333, [20, 2]],[3400, [20, 2]],[3500, [20, 2]],[3600, [20, 2]],[3700, [20, 2]],[3800, [20, 2]],[3900, [20, 2]],[4000, [20, 2]],[4100, [20, 2]],[4200, [20, 2]],[4300, [20, 2]],[4400, [20, 2]],[4500, [20, 2]],[4600, [20, 2]],[4700, [20, 2]],[4800, [20, 2]],[4900, [20, 2]],[5000, [20, 2]]]
    ],
    cashUpgrades: [[250000, [0, 3], false],[500000, [2, 3], false],[1000000, [4, 3], false],[5000000, [6, 3], false],[10000000, [8, 3], false],[25000000, [10, 3], false],[500000000, [12, 3], false],[10000000000, [14, 3], false],[50000000000, [16, 3], false],[250000000000, [18, 3], false],[1000000000000, [20, 3], false],[20000000000000, [0, 3], false],[50000000000000, [2, 3], false],[100000000000000, [4, 3], false],[500000000000000, [6, 3], false],[1e+15, [8, 3], false],[2e+15, [10, 3], false],[5e+15, [12, 3], false],[7e+15, [14, 3], false],[1e+16, [16, 3], false],[2e+16, [18, 3], false],[5e+16, [20, 3], false],[1e+17, [22, 1], false],[2e+18, [0, 3], false],[5e+18, [2, 3], false],[7e+18, [4, 3], false],[1e+19, [6, 3], false],[2e+19, [8, 3], false],[3.5e+19, [10, 3], false],[5e+19, [12, 3], false],[7.5e+19, [14, 3], false],[1e+20, [16, 3], false],[2e+20, [18, 3], false],[5e+20, [20, 3], false],[1e+21, [22, 1], false],[2.5e+22, [0, 3], false],[5e+22, [2, 3], false],[1e+23, [4, 3], false],[2e+23, [6, 3], false],[3e+23, [8, 3], false],[4e+23, [10, 3], false],[5e+23, [12, 3], false],[6e+23, [14, 3], false],[7e+23, [16, 3], false],[8e+23, [18, 3], false],[9e+23, [20, 3], false],[1e+25, [22, 2], false],[1e+27, [0, 7], false],[5e+27, [2, 7], false],[2.5e+28, [4, 7], false],[1e+29, [6, 7], false],[2.5e+29, [8, 7], false],[5e+29, [10, 7], false],[1e+30, [12, 7], false],[5e+30, [14, 7], false],[2.5e+31, [16, 7], false],[5e+31, [18, 7], false],[1e+42, [20, 7], false],[5e+42, [2, 3], false],[2.5e+43, [4, 3], false],[5e+43, [6, 3], false],[1e+44, [8, 3], false],[2.5e+44, [10, 3], false],[5e+44, [12, 3], false],[1e+45, [14, 3], false],[5e+45, [16, 3], false],[1e+46, [18, 3], false],[2.5e+46, [0, 3], false],[1e+47, [20, 3], false],[2.5e+47, [2, 3], false],[5e+47, [4, 3], false],[7.5e+47, [6, 3], false],[1e+48, [8, 3], false],[5e+48, [10, 3], false],[1.5e+49, [12, 3], false],[5e+49, [14, 3], false],[1e+50, [16, 3], false],[2.5e+50, [18, 3], false],[5e+50, [0, 3], false],[1e+51, [20, 7], false],[1e+54, [20, 5], false],[1e+60, [20, 7], false],[1e+61, [2, 3], false],[1e+62, [4, 3], false],[1e+66, [20, 9], false],[1e+67, [6, 3], false],[1e+68, [8, 3], false],[1e+72, [20, 11], false],[1e+73, [10, 3], false],[1e+74, [12, 3], false],[1e+75, [20, 13], false],[1e+76, [14, 3], false],[1e+77, [16, 3], false],[1e+78, [20, 15], false],[1e+79, [18, 3], false],[1e+80, [0, 3], false],[1e+84, [20, 3], false],[3e+87, [20, 3.1415926], false],[1e+90, [2, 3], false],[5e+90, [4, 3], false],[2.5e+91, [6, 3], false],[5e+91, [8, 3], false],[1e+92, [10, 3], false],[2.5e+92, [12, 3], false],[5e+92, [14, 3], false],[1e+93, [16, 3], false],[5e+93, [18, 3], false],[1e+94, [0, 3], false],[5e+95, [20, 2], false],[2e+96, [2, 2], false],[1.1e+97, [4, 2], false],[6.6e+97, [6, 2], false],[2.3e+98, [8, 2], false],[4e+98, [10, 2], false],[7e+98, [12, 2], false],[4e+99, [14, 2], false],[1e+100, [20, 3], false],[2e+100, [20, 6], false],[2.9e+100, [16, 2], false],[1.45e+101, [18, 2], false],[3e+101, [0, 2], false],[5e+101, [20, 2], false],[1e+102, [20, 5], false],[5e+102, [4, 3], false],[1.5e+104, [4, 3], false],[4e+104, [4, 3], false],[9e+104, [6, 3], false],[6e+105, [6, 3], false],[1.5e+106, [6, 3], false],[6e+106, [8, 2], false],[1.85e+107, [8, 3], false],[5e+107, [8, 3], false],[6e+107, [20, 3], false],[7.5e+107, [10, 2], false],[5e+108, [10, 3], false],[4.5e+109, [10, 3], false],[1.25e+110, [12, 3], false],[3e+110, [12, 3], false],[9e+110, [12, 3], false],[1e+111, [20, 3], false],[5e+111, [14, 2], false],[7e+112, [14, 3], false],[2.5e+113, [14, 3], false],[5e+113, [16, 3], false],[9e+113, [16, 3], false],[3e+114, [16, 3], false],[1.5e+115, [18, 3], false],[7.5e+115, [18, 3], false],[4e+116, [18, 3], false],[4.5e+116, [20, 3], false],[5e+116, [0, 3], false],[7.5e+116, [0, 3], false],[1e+117, [0, 3], false],[2e+117, [2, 3], false],[2e+118, [2, 3], false],[1.5e+119, [2, 3], false],[3.5e+119, [20, 5], false],[5e+119, [20, 3], false],[7e+119, [2, 3], false],[9.5e+119, [4, 3], false],[4e+120, [6, 3], false],[9e+120, [8, 3], false],[2.4e+121, [10, 3], false],[1.11e+122, [12, 3], false],[2.22e+122, [14, 3], false],[3.33e+122, [16, 3], false],[4.44e+122, [18, 3], false],[5.55e+122, [0, 3], false],[6.66e+122, [20, 6.66], false],[1e+123, [20, 3], false],[3e+123, [2, 3], false],[6e+123, [4, 3], false],[1.2e+124, [6, 3], false],[2.4e+124, [8, 3], false],[4.8e+124, [10, 3], false],[9.6e+124, [12, 3], false],[1.92e+125, [14, 3], false],[3.84e+125, [16, 3], false],[7.68e+125, [18, 3], false],[1e+126, [0, 3], false],[1e+127, [20, 5], false],[2e+129, [4, 3], false],[5e+129, [16, 3], false],[1.3e+130, [6, 3], false],[2.9e+130, [18, 3], false],[7.1e+130, [0, 3], false],[1.77e+131, [12, 3], false],[2.5e+131, [2, 3], false],[3.1e+131, [14, 3], false],[5.55e+131, [8, 3], false],[7.36e+131, [10, 3], false],[9e+131, [20, 2], false],[5e+132, [2, 2], false],[9.5e+133, [4, 2], false],[2.13e+134, [6, 2], false],[4e+134, [8, 2], false],[9.85e+134, [10, 2], false],[8e+135, [12, 2], false],[2.9e+136, [14, 2], false],[2.22e+137, [16, 2], false],[5e+137, [18, 2], false],[9e+137, [0, 2], false],[5e+138, [20, 3], false],[1.36e+140, [2, 3], false],[7e+140, [4, 3], false],[9.25e+140, [6, 3], false],[3e+141, [20, 3], false],[2.1e+142, [8, 3], false],[5.5e+142, [10, 3], false],[1.11e+143, [12, 3], false],[2.23e+143, [14, 3], false],[3.93e+143, [16, 3], false],[6e+143, [18, 3], false],[7.99e+143, [0, 3], false],[2e+144, [20, 3], false],[3e+144, [2, 3], false],[6e+144, [4, 3], false],[9e+144, [6, 3], false],[2.1e+145, [8, 3], false],[4.4e+145, [10, 3], false],[8.9e+145, [12, 3], false],[1.29e+146, [14, 3], false],[1.8e+146, [16, 3], false],[2.1e+146, [18, 3], false],[3e+146, [0, 3], false],[4.5e+146, [20, 2.71828], false],[5e+147, [10, 5], false],[3e+148, [2, 5], false],[1.8e+149, [4, 5], false],[9e+149, [16, 5], false],[5e+150, [6, 5], false],[2e+151, [18, 5], false],[8e+151, [8, 5], false],[2.4e+152, [0, 5], false],[7.2e+152, [12, 5], false],[2.1e+154, [14, 5], false],[5e+155, [20, 4.44444444444], false],[7.77e+155, [10, 2], false],[8.88e+155, [2, 2], false],[9.99e+155, [4, 2], false],[2e+156, [16, 2], false],[4e+156, [6, 2], false],[8e+156, [18, 2], false],[1.6e+157, [8, 2], false],[3.2e+157, [0, 2], false],[6.4e+157, [12, 2], false],[1.28e+158, [14, 2], false],[5.14e+158, [20, 2.99792458], false],[1e+159, [10, 3], false],[1e+160, [2, 3], false],[2.5e+160, [4, 3], false],[5e+160, [16, 3], false],[7.5e+160, [6, 3], false],[1e+161, [18, 3], false],[1.5e+161, [8, 3], false],[2e+161, [0, 3], false],[3e+161, [12, 3], false],[4e+161, [14, 3], false],[9e+161, [20, 2.35711], false],[1e+162, [14, 24], false],[2.5e+164, [20, 2], false],[5e+164, [2, 22], false],[7.5e+164, [20, 2], false],[1e+165, [4, 20], false],[2.5e+167, [20, 2], false],[5e+167, [16, 18], false],[7.5e+167, [20, 2], false],[1e+168, [10, 16], false],[2.5e+170, [20, 2], false],[5e+170, [12, 14], false],[7.5e+170, [20, 2], false],[1e+171, [18, 12], false],[2.5e+173, [20, 2], false],[5e+173, [0, 10], false],[7.5e+173, [20, 2], false],[1e+174, [6, 8], false],[2.5e+176, [20, 2], false],[5e+176, [8, 4], false],[1e+177, [20, 9], false],[5e+183, [20, 9.87654321], false],[5e+189, [20, 5], false],[2.7e+193, [20, 3], false],[1.3e+196, [20, 4], false],[2e+198, [20, 5], false],[1e+201, [0, 3], false],[1.4e+202, [2, 3], false],[9.6e+202, [4, 3], false],[1.98e+203, [6, 3], false],[3.22e+203, [8, 3], false],[6.79e+203, [10, 3], false],[8.88e+203, [12, 3], false],[1.9e+205, [14, 3], false],[8.1e+205, [16, 3], false],[1.99e+206, [18, 3], false],[2.33e+206, [0, 3], false],[4.21e+206, [2, 3], false],[6.07e+206, [4, 3], false],[7.77e+206, [6, 3], false],[9.1e+206, [8, 3], false],[2e+207, [10, 3], false],[9e+207, [12, 3], false],[4.5e+208, [14, 3], false],[2e+209, [16, 3], false],[3.28e+209, [18, 3], false],[6e+209, [20, 5], false],[1e+214, [0, 11], false],[1e+214, [2, 11], false],[1e+214, [4, 11], false],[1e+214, [6, 11], false],[1e+214, [8, 11], false],[1e+214, [10, 11], false],[1e+214, [12, 11], false],[1e+214, [14, 11], false],[1e+214, [16, 11], false],[1e+214, [18, 11], false],[1.5e+215, [0, 3], false],[1.66e+215, [2, 3], false],[1.93e+215, [4, 3], false],[4.1e+215, [6, 3], false],[6.78e+215, [8, 3], false],[9e+215, [10, 3], false],[1.2e+217, [12, 3], false],[6.7e+217, [14, 3], false],[1.23e+218, [16, 3], false],[3.21e+218, [18, 3], false],[5.55e+218, [20, 5], false],[8e+218, [0, 3], false],[8e+218, [2, 3], false],[8e+218, [4, 3], false],[9e+218, [6, 3], false],[3e+219, [8, 3], false],[4e+219, [10, 3], false],[5e+219, [12, 3], false],[6e+219, [14, 3], false],[3e+221, [16, 3], false],[4.21e+221, [18, 3], false],[6e+221, [0, 3], false],[7.89e+221, [2, 3], false],[8.45e+221, [4, 3], false],[2e+222, [6, 3], false],[5e+222, [8, 3], false],[1.4e+223, [10, 3], false],[5.4e+223, [12, 3], false],[1.08e+224, [14, 3], false],[2.19e+224, [16, 3], false],[4.68e+224, [18, 3], false],[1e+228, [0, 7], false],[1e+228, [2, 7], false],[1e+228, [4, 7], false],[1e+228, [6, 7], false],[1e+228, [8, 7], false],[1e+228, [10, 7], false],[1e+228, [12, 7], false],[1e+228, [14, 7], false],[1e+228, [16, 7], false],[1e+228, [18, 7], false],[1e+230, [20, 5], false],[3e+231, [0, 3], false],[8e+231, [2, 3], false],[6.9e+232, [4, 3], false],[1.88e+233, [6, 3], false],[2.39e+233, [8, 3], false],[4.11e+233, [10, 3], false],[7e+233, [12, 3], false],[9.12e+233, [14, 3], false],[1.2e+235, [16, 3], false],[2.4e+235, [18, 3], false],[6.3e+235, [0, 3], false],[1.99e+236, [2, 3], false],[3.98e+236, [4, 3], false],[5.66e+236, [6, 3], false],[7e+236, [8, 3], false],[8e+236, [10, 3], false],[9e+236, [12, 3], false],[1.2e+238, [14, 3], false],[2.5e+238, [16, 3], false],[5e+238, [18, 3], false],[1e+240, [0, 2], false],[5e+240, [2, 2], false],[9e+240, [4, 2], false],[2.1e+241, [6, 2], false],[4.5e+241, [8, 2], false],[8.9e+241, [10, 2], false],[1.53e+242, [12, 2], false],[2.99e+242, [14, 2], false],[5.77e+242, [16, 2], false],[8.13e+242, [18, 2], false],[2e+243, [0, 2], false],[2.2e+244, [2, 2], false],[4.4e+244, [4, 2], false],[6.6e+244, [6, 2], false],[8.8e+244, [8, 2], false],[1.11e+245, [10, 2], false],[2.22e+245, [12, 2], false],[3.33e+245, [14, 2], false],[4.44e+245, [16, 2], false],[5.55e+245, [18, 2], false],[1e+252, [20, 5], false],[1e+253, [0, 3], false],[1e+253, [2, 3], false],[1e+253, [4, 3], false],[1e+253, [6, 3], false],[1e+253, [8, 3], false],[1e+253, [10, 3], false],[1e+253, [12, 3], false],[1e+253, [14, 3], false],[1e+253, [16, 3], false],[1e+253, [18, 3], false],[5e+253, [0, 9], false],[7.5e+253, [2, 9], false],[1.25e+254, [4, 9], false],[6.25e+254, [6, 9], false],[3e+255, [8, 9], false],[1.5e+256, [10, 9], false],[7.5e+256, [12, 9], false],[3.75e+257, [14, 9], false],[1e+258, [16, 9], false],[8e+257, [18, 9], false],[2.5e+258, [20, 2], false],[6.4e+258, [0, 3], false],[1.22e+259, [2, 3], false],[2.33e+260, [4, 3], false],[3.99e+260, [6, 3], false],[7.66e+260, [8, 3], false],[1e+261, [10, 3], false],[1.9e+262, [12, 3], false],[9.8e+262, [14, 3], false],[2.6e+263, [16, 3], false],[5.44e+263, [18, 3], false],[7e+263, [0, 3], false],[1e+264, [2, 3], false],[4.5e+265, [4, 3], false],[6.9e+265, [6, 3], false],[8.9e+265, [8, 3], false],[1.89e+266, [10, 3], false],[2.89e+266, [12, 3], false],[4.48e+266, [14, 3], false],[9e+266, [16, 3], false],[5e+267, [18, 3], false],[1e+270, [20, 5], false],[1e+273, [0, 7], false],[2e+273, [2, 7], false],[3e+273, [4, 7], false],[6e+273, [6, 7], false],[2.5e+274, [8, 7], false],[2e+275, [10, 7], false],[6e+275, [12, 7], false],[9.99e+275, [14, 7], false],[1.5e+277, [16, 7], false],[3e+277, [18, 7], false],[1e+285, [2, 13], false],[1e+285, [4, 13], false],[1e+285, [6, 13], false],[1e+285, [8, 13], false],[1e+285, [10, 13], false],[1e+285, [12, 13], false],[1e+285, [14, 13], false],[1e+285, [16, 13], false],[1e+285, [18, 13], false]],
    angelUpgrades: [[10000, [20, 3], false, false],[100000, [22, 2], false, false],[100000000, [22, 2], false, false],[1000000000, [20, 5], false, false],[100000000000, [20, 9], false, false],[25000000, [31, 10], false, false],[25000000, [32, 10], false, false],[25000000, [33, 10], false, false],[25000000, [34, 10], false, false],[250000000, [31, 50], false, false],[250000000, [32, 50], false, false],[250000000, [33, 50], false, false],[250000000, [34, 50], false, false],[25000000000, [31, 50], false, false],[25000000000, [32, 50], false, false],[25000000000, [33, 50], false, false],[25000000000, [34, 50], false, false],[1000000000000, [20, 11], false, false],[250000000000000, [2, 3], false, false],[750000000000000, [4, 3], false, false],[2e+15, [6, 3], false, false],[5e+15, [8, 3], false, false],[1e+16, [10, 3], false, false],[2.5e+16, [12, 3], false, false],[7.5e+16, [14, 3], false, false],[2e+17, [16, 3], false, false],[4e+17, [18, 3], false, false],[1e+18, [0, 3], false, false],[1e+21, [20, 15], false, false],[1e+22, [31, 75], false, false],[1e+22, [32, 75], false, false],[1e+22, [33, 75], false, false],[1e+22, [34, 75], false, false],[1e+22, [35, 75], false, false],[1e+23, [31, 75], false, false],[1e+23, [32, 75], false, false],[1e+23, [33, 75], false, false],[1e+23, [34, 75], false, false],[1e+23, [35, 75], false, false],[1e+31, [31, 100], false, false],[1e+32, [32, 100], false, false],[1e+33, [22, 10], false, false],[1e+34, [20, 15], false, false],[1e+36, [20, 3], false, false],[1e+40, [20, 5], false, false],[1e+42, [20, 5], false, false],[2e+42, [31, 50], false, false],[1e+47, [4, 4], false, false],[2e+47, [6, 6], false, false],[7e+47, [8, 3], false, false],[2e+48, [10, 3], false, false],[2.5e+49, [12, 3], false, false],[5e+50, [14, 3], false, false],[2e+52, [16, 3], false, false],[8e+52, [18, 3], false, false],[1.5e+53, [0, 3], false, false],[3e+53, [2, 3], false, false],[5e+53, [22, 10], false, false],[1e+54, [2, 3], false, false],[4e+54, [4, 3], false, false],[9e+54, [6, 3], false, false],[2.5e+55, [8, 3], false, false],[7.5e+55, [10, 3], false, false],[1.77e+56, [12, 3], false, false],[3e+56, [14, 3], false, false],[5e+56, [16, 3], false, false],[8e+56, [18, 3], false, false],[1e+57, [0, 3], false, false],[3e+61, [31, 30], false, false],[3e+61, [32, 30], false, false],[3e+61, [33, 30], false, false],[3e+61, [34, 30], false, false],[3e+61, [36, 30], false, false],[1e+62, [20, 5], false, false],[2e+63, [2, 3], false, false],[2e+63, [4, 3], false, false],[2e+63, [6, 3], false, false],[2e+63, [8, 3], false, false],[2e+63, [10, 3], false, false],[2e+63, [12, 3], false, false],[2e+63, [14, 3], false, false],[2e+63, [16, 3], false, false],[2e+63, [18, 3], false, false],[2e+63, [0, 3], false, false],[1e+65, [20, 7], false, false],[1e+66, [2, 3], false, false],[4e+66, [4, 3], false, false],[1.3e+67, [6, 3], false, false],[2e+67, [8, 3], false, false],[2.9e+67, [10, 3], false, false],[3.8e+67, [12, 3], false, false],[5.2e+67, [14, 3], false, false],[6.7e+67, [16, 3], false, false],[7.2e+67, [18, 3], false, false],[9.6e+67, [0, 3], false, false],[1.25e+68, [31, 50], false, false],[7.77e+68, [20, 7.777777], false, false],[5e+69, [31, 10], false, false],[5e+69, [32, 10], false, false],[5e+69, [33, 10], false, false],[5e+69, [34, 10], false, false],[5e+69, [35, 10], false, false],[5e+69, [36, 10], false, false],[5e+69, [37, 10], false, false],[5e+69, [38, 10], false, false],[5e+69, [39, 10], false, false],[5e+69, [30, 10], false, false],[1e+72, [2, 3], false, false],[5e+72, [4, 3], false, false],[2.2e+73, [6, 3], false, false],[4.4e+73, [8, 3], false, false],[1.11e+74, [10, 3], false, false],[2.22e+74, [12, 3], false, false],[3.33e+74, [14, 3], false, false],[4.44e+74, [16, 3], false, false],[5.55e+74, [18, 3], false, false],[6.66e+74, [0, 3], false, false],[2.5e+76, [32, 25], false, false],[2.5e+76, [31, 25], false, false],[2.5e+76, [33, 25], false, false],[2.5e+76, [34, 25], false, false],[2.5e+76, [35, 25], false, false],[2.5e+76, [36, 25], false, false],[2.5e+76, [37, 25], false, false],[2.5e+76, [38, 25], false, false],[2.5e+76, [39, 25], false, false],[2.5e+76, [30, 25], false, false],[1.1e+79, [2, 3], false, false],[2.7e+79, [4, 3], false, false],[4.3e+79, [6, 3], false, false],[8.7e+79, [8, 3], false, false],[1.9e+80, [10, 3], false, false],[3.21e+80, [12, 3], false, false],[4.95e+80, [14, 3], false, false],[6e+80, [16, 3], false, false],[7.25e+80, [18, 3], false, false],[8.98e+80, [0, 3], false, false],[3e+84, [20, 13.11], false, false],[1.3e+88, [20, 5], false, false],[3e+90, [20, 3], false, false],[1.3e+94, [20, 4], false, false],[2.4e+97, [20, 5], false, false],[1e+102, [31, 25], false, false],[1e+102, [32, 25], false, false],[1e+102, [33, 25], false, false],[1e+102, [34, 25], false, false],[1e+102, [35, 25], false, false],[1e+102, [36, 25], false, false],[1e+102, [37, 25], false, false],[1e+102, [38, 25], false, false],[1e+102, [39, 25], false, false],[1e+102, [30, 25], false, false],[3.33e+110, [20, 3], false, false],[1e+114, [2, 3], false, false],[2e+115, [4, 3], false, false],[5e+115, [6, 3], false, false],[1e+116, [8, 3], false, false],[2e+116, [10, 3], false, false],[3e+116, [12, 3], false, false],[4e+116, [14, 3], false, false],[5e+116, [16, 3], false, false],[7.5e+116, [18, 3], false, false],[2e+117, [0, 3], false, false],[1e+129, [31, 25], false, false],[1e+129, [32, 25], false, false],[1e+129, [33, 25], false, false],[1e+129, [34, 25], false, false],[1e+129, [35, 25], false, false],[1e+129, [36, 25], false, false],[1e+129, [37, 25], false, false],[1e+129, [38, 25], false, false],[1e+129, [39, 25], false, false],[1e+129, [30, 25], false, false],[1e+138, [2, 3], false, false],[4e+138, [4, 3], false, false],[1.6e+139, [6, 3], false, false],[5.6e+139, [8, 3], false, false],[1e+140, [10, 3], false, false],[2.11e+140, [12, 3], false, false],[3.49e+140, [14, 3], false, false],[4.43e+140, [16, 3], false, false],[5.67e+140, [18, 3], false, false],[7.01e+140, [0, 3], false, false],[9e+140, [31, 25], false, false],[9e+140, [32, 25], false, false],[9e+140, [33, 25], false, false],[9e+140, [34, 25], false, false],[9e+140, [35, 25], false, false],[9e+140, [36, 25], false, false],[9e+140, [37, 25], false, false],[9e+140, [38, 25], false, false],[9e+140, [39, 25], false, false],[9e+140, [30, 25], false, false],[1e+140, [20, 19], false, false]],
    managerUpgrades: [[[10e+9, false],[9e+126, false]],[[1e+9, false],[10e+102, false]],[[100e+6, false],[3e+120, false]],[[10e+6, false],[100e+111, false]],[[1e+6, false],[3e+117, false]],[[100000, false],[750e+117, false]],[[9999, false],[75e+105, false]],[[1000, false],[250e+108, false]],[[100, false],[50e+114, false]],[[10, false],[33e+123, false]]]
});