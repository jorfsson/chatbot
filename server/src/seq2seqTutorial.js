/*
  Tutorial exercise for building a seq2seq model for converting English to French
  1. Entire model can be split into 2 smaller sub-models: Encoder & Decoder
    a. Encoder takes raw input text data
      i. Outputs a neural representation (somewhat encrypted)
    b. Encoder provides the input for Decoder
  2. 6 Step Process
    i. Define input parameters to the encoder model
      -enc_dec_model_inputs
    ii. Build encoder model
      -encoding_layer
    iii. Define input parameters to the decoder models
      -enc_dec_model_inputs, process_decoder_input, decoding_layer
    iv. Build decoder model for training
      -decoding_layer_train
    v. Build decoder model for inference
      -decoding_layer_infer
    vi. Put (4) and (5) together
      -decoding_layer
    vii. Connect encoder and decoder models
      -seq2seq_model
    viii. Define loss function, optimizer and apply gradient clipping
*/


const enc_dec_model_inputs = () => {
  return {
    inputs: tf.placeholder(tf.int32, [None, None], {name: 'input'}),
    targets: tf.placeholder(tf.int32, [None, None], {name: 'target'}),

    target_sequence_length: tf.placeholder(tf.int32, [None], {name: 'target_sequence_length'}),
    max_target_len: tf.reduce_max(target_sequence_length);
  }
}
