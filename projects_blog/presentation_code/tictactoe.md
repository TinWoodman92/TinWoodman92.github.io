```python
#Next Steps:
# Build & export move log for games
# Build a board timeline variable/class - Export this?
# Build an analysys board class for bots to use thinking through the next commands.
# Look into usin scikit-learn to create a decistion tree model, then have a bot level that loads and uses the model. - See if you could have it programmed itself playing against the other bot levels. Probably need an X model & O model.
# Probably need to translate some of the variables as classes -- THIS WILL BE GOOD FOR EDUCATION -- I NEED TO PRACTICE OBJECT-ORIENTED PROGRAMMING AT LEAST ONCE YOU'D THINK.
# Probably should export the bot functionality to a separate module


import random

def prt_brd(brd):
	print(f"""
3 {brd[0][2]}|{brd[1][2]}|{brd[2][2]}
2 {brd[0][1]}|{brd[1][1]}|{brd[2][1]}
1 {brd[0][0]}|{brd[1][0]}|{brd[2][0]}
  a b c
""")

def rnd(i = 1): return random.randint(0,i)

def bot_cmd(lvl, trn, brd):
	if lvl >= 1:
		#check for potential victory
		#check files and ranks
		for r in range(0,3):
			if brd[r].count(trn) == 2 and brd[r].count(' ') == 1: return file_name[r]+rank_name[brd[r].index(' ')]
			if (brd[0][r]+brd[1][r]+brd[2][r]).count(trn) == 2 and (brd[0][r]+brd[1][r]+brd[2][r]).count(' ') == 1: return file_name[(brd[0][r]+brd[1][r]+brd[2][r]).index(' ')]+rank_name[r]
	
		#check diagonals
		if (brd[0][0]+brd[1][1]+brd[2][2]).count(trn) == 2 and (brd[0][0]+brd[1][1]+brd[2][2]).count(' ') == 1: return file_name[(brd[0][0]+brd[1][1]+brd[2][2]).index(' ')]+rank_name[(brd[0][0]+brd[1][1]+brd[2][2]).index(' ')]
		if (brd[0][2]+brd[1][1]+brd[2][0]).count(trn) == 2 and (brd[0][2]+brd[1][1]+brd[2][0]).count(' ') == 1: return file_name[(brd[0][2]+brd[1][1]+brd[2][0]).index(' ')]+rank_name[(brd[2][0]+brd[1][1]+brd[0][2]).index(' ')]
	
	if lvl >= 2:
		alt_trn = plr_trn[trn == 'X']
		#check for potential next-turn loss
		#check files and ranks
		for r in range(0,3):
			if brd[r].count(alt_trn) == 2 and brd[r].count(' ') == 1: return file_name[r]+rank_name[brd[r].index(' ')]
			if (brd[0][r]+brd[1][r]+brd[2][r]).count(alt_trn) == 2 and (brd[0][r]+brd[1][r]+brd[2][r]).count(' ') == 1: return file_name[(brd[0][r]+brd[1][r]+brd[2][r]).index(' ')]+rank_name[r]
	
		#check diagonals
		if (brd[0][0]+brd[1][1]+brd[2][2]).count(alt_trn) == 2 and (brd[0][0]+brd[1][1]+brd[2][2]).count(' ') == 1: return file_name[(brd[0][0]+brd[1][1]+brd[2][2]).index(' ')]+rank_name[(brd[0][0]+brd[1][1]+brd[2][2]).index(' ')]
		if (brd[0][2]+brd[1][1]+brd[2][0]).count(alt_trn) == 2 and (brd[0][2]+brd[1][1]+brd[2][0]).count(' ') == 1: return file_name[(brd[0][2]+brd[1][1]+brd[2][0]).index(' ')]+rank_name[(brd[2][0]+brd[1][1]+brd[0][2]).index(' ')]
	
	if lvl >= 3:
		random.shuffle(vic_rng)
		rng_ind = [0, 1, 2]
		#build on existing rows
		for rng in vic_rng:
			for d in range(0,3):
				if rng == file_name[d] and brd[d].count(trn) == 1 and brd[d].count(' ') == 2: 
					rng_ind.remove(brd[d].index(trn))
					return file_name[d]+rank_name[rng_ind[rnd()]]
				elif rng == rank_name[d] and (brd[0][d]+brd[1][d]+brd[2][d]).count(trn) == 1 and (brd[0][d]+brd[1][d]+brd[2][d]).count(' ') == 2: 
					rng_ind.remove((brd[0][d]+brd[1][d]+brd[2][d]).index(trn))
					return file_name[rng_ind[rnd()]]+rank_name[d]
			if rng == 'd1' and (brd[0][0]+brd[1][1]+brd[2][2]).count(trn) == 1 and (brd[0][0]+brd[1][1]+brd[2][2]).count(' ') == 2: 
				rng_ind.remove((brd[0][0]+brd[1][1]+brd[2][2]).index(trn))
				f = rng_ind[rnd()]
				return file_name[f]+rank_name[f]
			elif rng == 'd2' and (brd[0][2]+brd[1][1]+brd[2][0]).count(trn) == 1 and (brd[0][2]+brd[1][1]+brd[2][0]).count(' ') == 2: 
				rng_ind.remove((brd[0][2]+brd[1][1]+brd[2][0]).index(trn))
				f = rng_ind[rnd()]
				return file_name[f]+rank_name[2 - f]
	
	while True:
		f = rnd(2)
		r = rnd(2)
		if board[f][r] == ' ': return file_name[f]+rank_name[r]
	
rank = [' ', ' ', ' ']
file = [' ', ' ', ' ']
file_name = ['a', 'b', 'c']
rank_name = ['1', '2', '3']
f = 0
r = 0
d = 0
turn = 'X'
vic_chk = False
valid_move = False
board = [file[:], file[:], file[:]]
plrs = -1
plrs_str = '0'
plr = [False, False]
plr_trn = ('X', 'O')
one_plr = 'X'
bot_lvl = [-1, -1]
lvl_str = ''
bot_lvl_name = ['Random', 'Easy', 'Medium', 'Medium_2']
vic_rng = file_name + rank_name + ['d1', 'd2']
rng = ''
rng_ind = [0, 1, 2]

input("""----- TIC TAC TOE -----
Press Enter to play!
""")

while plrs > 2 or plrs < 0:
	plrs_str = input("Enter the number of players: ")
	if len(plrs_str) > 0:
		if plrs_str[0].isnumeric(): plrs = int(plrs_str[0])
print()

for r in range(0, plrs):
	plr[r] = True

if plrs == 1: 
	while True:
		one_plr = input("Do you want play as the X's or as the O's? ").upper()
		if len(one_plr) > 0:
			if one_plr[0] == 'X' or one_plr[0] == 'O': 
				plr = [one_plr[0] == 'X', one_plr[0] == 'O']
				print()
				break
				
if False in plr:
	for r in range(0, len(bot_lvl_name)):
		print(f"Level {r} - {bot_lvl_name[r]}")
	print()

for r in range(0,2):
	while not plr[r] and bot_lvl[r] == -1:
		lvl_str = input(f"Please select {plr_trn[r]} bot level number: ")
		if len(lvl_str) > 0:
			if lvl_str[0].isnumeric(): bot_lvl[r] = int(lvl_str[0])

prt_brd(board)

while True:

	valid_move = False
	while not valid_move:
		#player uses input()
		#computer uses bot_cmd()
		if plr[turn == 'O']: cmd = input(f"{turn} to Move: ")
		else:
			cmd = bot_cmd(bot_lvl[turn == 'O'], turn, board)
			print(f"{turn} to Move: {cmd}")
		if len(cmd) == 2:
			if file_name.count(cmd[0]) == 1 and rank_name.count(cmd[1]) == 1:
				f = file_name.index(cmd[0])
				r = rank_name.index(cmd[1])
				if board[f][r] == ' ':
					board[f][r] = turn
					valid_move = True
				else: print("Illegal move")
			else: print("Invalid move")
		else: print("Invalid move")
		
	prt_brd(board)
	
	#check for victory
	#check files and ranks
	for r in range(0,3):
		if board[r].count(turn) == 3: vic_chk = True
		if (board[0][r]+board[1][r]+board[2][r]).count(turn) == 3: vic_chk = True
	
	#check diagonals
	if (board[0][0]+board[1][1]+board[2][2]).count(turn) == 3: vic_chk = True
	if (board[0][2]+board[1][1]+board[2][0]).count(turn) == 3: vic_chk = True

	if vic_chk: break
	if board[0].count(' ') + board[1].count(' ') + board[2].count(' ') == 0: break

	turn = plr_trn[turn == 'X']

if vic_chk: print(f"{turn} Wins!")
else: print("Draw")

input()
input("""----- Thank you for playing! -----
Press Enter to exit.
""")