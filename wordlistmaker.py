def make_word_list(file,n):
    words = open("wordfile.txt","a")
    words_list = "words%i = ("%(n)
    full_list = open(file,"r")
    prev_word = ""
    for line in full_list:
        word = line.strip()
        word_len = len(word)
        if word[word_len-2] == "'":
            word = word[:word_len-2]
            word_len = len(word)
        if word != prev_word and word_len == n:
            words_list += '"%s",'%(word)
        prev_word = word
    words_list = words_list[:len(words_list)-1]
    words_list += ");\n\n"
    words.write(words_list)
