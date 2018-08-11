#Bayes Probability
    #"The presence of a particular feature in a class is unrelated to the presence of any other feature"
    #Apple = Red, round, 3 inches in diameter. These features on their own are unrelated, but together describe an apple.

    #P(c/X) = P(x(1)|c) x P(x(2)|c)x...xP(x(n)|c) x P(c)
        #P(c|x) === the posterior Probability of class (c, target) given predictor (x, attributes)
        #P(c) is the prior probability of class
        #P(x|c) is the likelihood which is the probability of predictor given class
        #P(x) is the probability of the predictor

        #The likelhood that it will be sunny and we will play
            #The percentage that it has been sunny and we have played
            #Times the amount of times we have played regardless of weather
            #Divided by the times that it has been sunny


#Logistic Regression
    #Logistic Regression is based on the logistic function, aka the sigmoid function
        #Developed to describe the properties of population growth, rising quickly and maxing out at the carrying capacity of the envo
        # 1 / (1 + e^-value)
            # e === base of the natural logarithms aka Euler's number
